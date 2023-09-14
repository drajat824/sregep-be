const express = require("express");
const dotenv = require("dotenv").config();
const db = require("./models");
const cors = require("cors")

const app = express();

const server = require('http').createServer(app);

app.use("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/api", (req, res) => {
  res.json({ message: "Sregep is online" });
});

app.get("/", (request, response) => { response.send("Server Sregep is running bro!")})

require("./routes/auth.js")(app);
require("./routes/admin.js")(app);
require("./routes/student.js")(app);
require("./routes/teacher.js")(app);
// db.sequelize.sync();

server.listen(process.env.PORT, () => {
  console.log("Server running");
});

