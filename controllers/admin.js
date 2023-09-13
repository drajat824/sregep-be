const db = require("../models");
const bcrypt = require("bcryptjs");
const ULID = require("ulid");

const Group = db.group;
const Jadwal = db.jadwal;
const Student = db.student;
const Teacher = db.teacher;

exports.addStudent = async (req, res) => {
  if (!req.role === "admin") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (!req.body.name || !req.body.studentId) {
    return res.status(400).json({ message: "Bad request" });
  }

  const exist = await Student.findOne({ where: { studentId: req.body.studentId } });
  if (exist) {
    return res.status(401).json({ message: "Student Id already exist" });
  }

  Student.create({
    name: req.body.name,
    studentId: req.body.studentId,
    adminId: req.uuid,
    groupId: req.body.groupId,
    role: "student",
  })
    .then((student) => {
      res.json({ message: "Successfully created account", data: student });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.addGroup = async (req, res) => {
  if (!req.role === "admin") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (!req.body.name) {
    return res.status(400).json({ message: "Bad request" });
  }

  const exist = await Group.findOne({ where: { name: req.body.name, ownerId: req.uuid } });
  if (exist) {
    return res.status(400).json({ message: "Group name already taken" });
  }

  const groupId = ULID.ulid();
  Group.create({
    groupId: groupId,
    name: req.body.name,
    ownerId: req.uuid,
    tag: req.body.tag || [],
  })
    .then((group) => {
      res.json({ message: "Successfuly created group", data: group });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.addTeacher = async (req, res) => {
  if (!req.role === "admin") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (!req.body.name || !req.body.username || !req.body.password) {
    return res.status(400).json({ message: "Bad request" });
  }

  const exist = await Teacher.findOne({ where: { username: req.body.username } });
  if (exist) {
    return res.status(401).json({ message: "Username already exist" });
  }

  Teacher.create({
    name: req.body.name,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    adminId: req.uuid,
    role: "teacher",
  })
    .then((teacher) => {
      res.json({ message: "Successfully created account", data: teacher });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.createJadwal = async (req, res) => {
  if (!req.role === "admin") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (
    !req.body.day ||
    !req.body.subject ||
    !req.body.startTime ||
    !req.body.endTime ||
    !req.body.teacherId ||
    !req.body.groupId ||
    !req.body.groupName ||
    !req.body.teacherName
  ) {
    return res.status(400).json({ message: "Bad request" });
  }

  Jadwal.create({
    groupId: req.body.groupId,
    ownerId: req.uuid,
    day: req.body.day,
    subject: req.body.subject,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    teacherId: req.body.teacherId,
    teacherName: req.body.teacherName,
    groupName: req.body.groupName,
    tag: req.body.tag || [],
  })
    .then((jadwal) => {
      res.json({ message: "Successfuly created jadwal", data: jadwal });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.getJadwal = async (req, res) => {
  if (!req.role === "admin") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  Jadwal.findAll({
    where: {
      ownerId: req.uuid,
    },
  })
    .then((jadwal) => {
      res.json({ data: jadwal });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.getTeacher = (req, res) => {
  if (!req.role === "admin") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  Teacher.findAll({
    where: {
      adminId: req.uuid,
    },
  })
    .then((teacher) => {
      res.json({ data: teacher });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.getStudent = (req, res) => {
  if (!req.role === "admin") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  Student.findAll({
    where: {
      adminId: req.uuid,
      groupId: req.params.groupId
    },
  })
    .then((student) => {
      res.json({ data: student });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.getGroup = (req, res) => {
  if (!req.role === "admin") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  Group.findAll({
    where: {
      ownerId: req.uuid,
    },
  })
    .then((group) => {
      res.json({ data: group });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};