const express = require("express");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authControler");
const router = express.Router({ mergeParams: true });
//router.use(authController.protect);
router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(authController.protect,reviewController.setProductUserIds, reviewController.createReview);

router
  .route("/:id")
  .get(reviewController.getReview)
  .patch(
    authController.protect,
    // authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
   // authController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  );

module.exports = router;
