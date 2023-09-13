const db = require("../models");
const ULID = require("ulid");

const Jadwal = db.jadwal;
const Absensi = db.absensi;
const RekapAbsen = db.rekapAbsen;

exports.getJadwal = async (req, res) => {
  if (!req.uuid) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  Jadwal.findAll({ where: { teacherId: req.uuid } })
    .then((jadwal) => {
      res.json({ data: jadwal });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.createAbsensi = async (req, res) => {
  if (!req.uuid) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (!req.body.jadwalId || !req.body.type) {
    return res.status(400).json({ message: "Bad request jadwalId or type not defined" });
  }
  Absensi.create({
    jadwalId: req.body.jadwalId,
    teacherId: req.uuid,
    absenId: ULID.ulid(),
    type: req.body.type,
    maxTime: req.body.maxTime || null,
    lokasi: req.body.lokasi || null,
    question: req.body.question || null,
  })
    .then((absensi) => {
      res.json({ data: absensi });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.getAbsensi = async (req, res) => {
  if (!req.uuid) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  RekapAbsen.findAll({
    where: {
      teacherId: req.uuid,
    },
  })
    .then((absensi) => {
      res.json({ data: absensi });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.getAbsensis = async (req, res) => {
  if (!req.uuid) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  Absensi.findAll({
    where: {
      teacherId: req.uuid,
      jadwalId: req.params.jadwalId
    },
  })
    .then((absensi) => {
      res.json({ data: absensi });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.getAbsensiss = async (req, res) => {
  if (!req.uuid) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  Absensi.findAll({
    where: {
      teacherId: req.uuid,
    },
  })
    .then((absensi) => {
      res.json({ data: absensi });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.getStudent = async (req, res) => {
  if (!req.uuid) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  Student.findAll({ where: { groupId: req.params.groupId } })
    .then((student) => {
      res.json({ data: student });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
// exports.getStudent = async (req, res) => {
//   if (!req.uuid) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
//   Jadwal.findAll({ where: { teacherId: req.uuid } })
//     .then((jadwal) => {
//       res.json({ data: jadwal });
//     })
//     .catch((err) => {
//       res.status(500).json({ message: err.message });
//     });
// };
