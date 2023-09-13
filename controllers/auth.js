const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = db.user;
const Student = db.student;
const Teacher = db.teacher;

exports.register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "Bad request" });
  }

  const exist = await User.findOne({ where: { email: req.body.email } });
  if (exist) return res.status(401).json({ message: "Email already taken" });

  User.create({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    role: "admin",
  })
    .then(() => {
      res.json({ message: "Successfully register" });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.login = async (req, res) => {
  if ((!req.body.username || !req.body.email) && !req.body.password) {
    return res.status(400).json({ message: "Bad request", data: null });
  }

  let user;
  if (req.body.email) {
    user = await User.findOne({ where: { email: req.body.email } });
  }
  if (req.body.username) {
    user = await User.findOne({ where: { username: req.body.username } });
  }

  if (!user) {
    return res.status(401).json({ message: "User not found", data: null });
  }
  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(401).json({ message: "Invalid password", data: null });
  }
  const token = jwt.sign({ uuid: user.uuid, role: user.role }, "sregep-masuk-secret", {
    expiresIn: 86400,
  });
  res.json({
    data: {
      user: { name: user.name, email: user.email, username: user.username, role: user.role },
      token: token,
    },
  });
};

exports.loginStudent = async (req, res) => {
  if (!req.body.name || !req.body.studentId) {
    return res.status(400).json({ message: "Bad request", data: null });
  }

  let user = await Student.findOne({ where: { studentId: req.body.studentId } });

  if (!user) {
    return res.status(401).json({ message: "User not found", data: null });
  }

  if (!req.body.studentId == user.studentId) {
    return res.status(401).json({ message: "Invalid Student Id", data: null });
  }
  const token = jwt.sign({ uuid: user.uuid, role: user.role }, "sregep-masuk-secret", {
    expiresIn: 86400,
  });
  res.json({
    data: {
      user: user,
      token: token,
    },
  });
};

exports.loginTeacher = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: "Bad request", data: null });
  }

  let user = await Teacher.findOne({ where: { username: req.body.username } });

  if (!user) {
    return res.status(401).json({ message: "User not found", data: null });
  }
  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(401).json({ message: "Invalid Password", data: null });
  }
  const token = jwt.sign({ uuid: user.uuid, role: user.role }, "sregep-masuk-secret", {
    expiresIn: 86400,
  });
  delete user.password;
  res.json({
    data: {
      user: { name: user },
      token: token,
    },
  });
};
