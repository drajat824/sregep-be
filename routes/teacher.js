const controller = require("../controllers/teacher.js");
const authJWT = require("../middleware/authJWT.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Header", "Authorization, Origin, Content-Type, Accept");
    next();
  });
  app.get("/api/teacher/jadwal", [authJWT.verifyToken], controller.getJadwal);
  app.get("/api/teacher/rekap-absensi", [authJWT.verifyToken], controller.getAbsensi);
  app.post("/api/teacher/absensi", [authJWT.verifyToken], controller.createAbsensi);
  app.get("/api/teacher/student/:groupId", [authJWT.verifyToken], controller.getStudent);
  app.get("/api/teacher/absensi/:jadwalId", [authJWT.verifyToken], controller.getAbsensis);
  app.get("/api/teacher/absensi", [authJWT.verifyToken], controller.getAbsensiss);
  //app.get("/api/teacher/absensi/rekap", [authJWT.verifyToken], controller.getAllRekap);
};
