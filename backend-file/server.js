require("dotenv").config();
const User = require("./app/models/user"); // Import your user model
const user = new User();
const app = require("./app/app.js");
const port = process.env.PORT || 3000;

app.listen(port, console.log(`Server running on  ${port}`));
