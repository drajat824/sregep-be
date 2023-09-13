const { Op } = require("sequelize");
const db = require("../models");

const Student = db.student;
const Jadwal = db.jadwal;
const Absensi = db.absensi;
const RekapAbsen = db.rekapAbsen;

exports.getJadwal = async (req, res) => {
  if (!req.uuid) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const student = await Student.findOne({ where: { uuid: req.uuid } });
  if (!student.groupId) {
    return res.status(401).json({ message: "You're not in group" });
  }
  Jadwal.findOne({ where: { groupId: student.groupId } })
    .then((jadwal) => {
      res.json({ data: jadwal });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.getAbsen = (req, res) => {
  if (!req.uuid) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  Absensi.findOne({
    where: {
      jadwalId: req.params.jadwalId,
      createdAt: {
        [Op.between]: [today, new Date(today.getTime() + 24 * 60 * 60 * 1000)],
      },
    },
  })
    .then((absensi) => {
      return res.json({ data: absensi });
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
};

exports.postAbsen = (req, res) => {
  if (!req.uuid) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  RekapAbsen.create({
    absenId: req.params.absenId,
    teacherId: req.body.teacherId, // required
    name: req.body.name, // required
    uuid: req.uuid,
    groupId: req.body.groupId, // required
    status: req.body.status, // Hadir, Ijin, Deafult Alpha
    keterangan: req.body.keterangan, // Opsional (sakit, ijin)
    type: req.body.type, // Awal, Akhir
    lokasi: req.body.lokasi, // required {lat, lang}
    answer: req.body.answer, // Opsional (jawaban pertanyaan)
  })
    .then((absensi) => {
      return res.json({ data: absensi });
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
};


exports.updatePublicKey = (req, res) => {
  if (!req.uuid) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  Student.update(
    {
      publicKey: req.body.public_key,
    },
    {
      where: {
        uuid: req.uuid,
      },
    }
  )
    .then(() => {
      return res.json({ message: "Update successfuly" });
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
};
