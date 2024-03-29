const User = require("../models/user");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const multer = require("multer");
const sharp = require("sharp");
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    totalUser: users.length,
    data: {
      users: users,
    },
  });
});
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.uploadUserPhoto = upload.single("photo");
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  console.log(req.filename);
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/users/${req.file.filename}`);
  next();
});
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.updateMe = catchAsync(async (req, res, next) => {
  //Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(
    req.body,
    "fullName",
    "email",
    "phoneNumber",
    "username"
  );
  if (req.file) filteredBody.photo = req.file.filename;
  //Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
exports.getMe = catchAsync(async (req, res, next) => {
  req.params.userId = req.user.id;
  next();
});
exports.getOneUser = catchAsync(async (req, res, next) => {
  let query = User.findById(req.params.userId);
  const user = await query;
  if (!user) {
    return next(new AppError("No User found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: user,
    },
  });
});
exports.deleteUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(`There is no user with ${userId} _id`);
    }
    user.isActive = user.isActive == false ? true : false;
    await user.save();
    return res.status(204).json({
      status: "success",
      data: {
        user: user,
      },
    });
  } catch (err) {
    next(err);
  }
};
exports.updateOne = catchAsync(async (req, res, next) => {
  const doc = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});
