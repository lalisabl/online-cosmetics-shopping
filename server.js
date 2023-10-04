require("dotenv").config();
const User = require('./app/models/user'); // Import your user model
const user = new User();
const app = require("./app/app.js");
const port = process.env.PORT || 3000;
user.password = 'try this'; 
//user.password = user.hashPassword(user.password);
console.log(user.password)
app.listen(port, console.log(`Server running on  ${port}`));
