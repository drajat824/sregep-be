const Sequelize = require("sequelize");
const dotenv = require("dotenv").config();

const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: "mysql",
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user.js")(sequelize, Sequelize);
db.group = require("./group.js")(sequelize, Sequelize);
db.jadwal = require("./jadwal.js")(sequelize, Sequelize);
db.student = require("./student.js")(sequelize, Sequelize);
db.teacher = require("./teacher.js")(sequelize, Sequelize);
db.absensi = require("./absensi.js")(sequelize, Sequelize);
db.rekapAbsen = require("./rekap-absen.js")(sequelize, Sequelize);

module.exports = db;
