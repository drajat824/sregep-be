const controller = require("../controllers/admin.js");
const authJWT = require("../middleware/authJWT.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Header", "Authorization, Origin, Content-Type, Accept");
    next();
  });
  app.post("/api/admin/create/student", [authJWT.verifyToken], controller.addStudent);
  app.post("/api/admin/create/teacher", [authJWT.verifyToken], controller.addTeacher);
  app.post("/api/admin/create/group", [authJWT.verifyToken], controller.addGroup);
  app.post("/api/admin/create/jadwal", [authJWT.verifyToken], controller.createJadwal);
  app.get("/api/admin/get/jadwal", [authJWT.verifyToken], controller.getJadwal);
  app.get("/api/admin/get/teacher", [authJWT.verifyToken], controller.getTeacher);
  app.get("/api/admin/get/student/:groupId", [authJWT.verifyToken], controller.getStudent);
  app.get("/api/admin/get/group", [authJWT.verifyToken], controller.getGroup);
};
