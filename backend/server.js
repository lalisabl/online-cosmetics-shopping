require("dotenv").config();
const app = require("./app/app.js");
const port = process.env.PORT || 3000;
app.listen(port, console.log(`Server running on  ${port}`));
