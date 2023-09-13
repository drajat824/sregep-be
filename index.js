const express = require("express");
const dotenv = require("dotenv").config();
const db = require("./models");
const cors = require("cors")

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  res.json({ message: "Sregep is online" });
});

require("./routes/auth.js")(app);
require("./routes/admin.js")(app);
require("./routes/student.js")(app);
require("./routes/teacher.js")(app);
//db.sequelize.sync();

app.listen(process.env.PORT, () => {
  console.log("Server running");
});
