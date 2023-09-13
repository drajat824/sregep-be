const controller = require("../controllers/auth.js");

module.exports = function (app) {
  app.post("/api/auth/register", controller.register);
  app.post("/api/auth/login", controller.login);
  app.post("/api/auth/login/student", controller.loginStudent);
  app.post("/api/auth/login/teacher", controller.loginTeacher);
};
