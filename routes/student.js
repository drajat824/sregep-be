const controller = require("../controllers/student.js");
const authJWT = require("../middleware/authJWT.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Header", "Authorization, Origin, Content-Type, Accept");
    next();
  });
  app.get("/api/student/jadwal", [authJWT.verifyToken], controller.getJadwal);
  app.get("/api/student/absensi/:jadwalId", [authJWT.verifyToken], controller.getAbsen);
  app.post("/api/student/absensi/:absenId", [authJWT.verifyToken], controller.postAbsen);
  app.put("/api/student/publickey", [authJWT.verifyToken], controller.updatePublicKey);
};
