module.exports = (sequelize, Sequelize) => {
  const Absensi = sequelize.define("rekap-absen", {
    teacherId: {
      type: Sequelize.STRING,
    },
    absenId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
    },
    uuid: {
      type: Sequelize.STRING,
    },
    groupId: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.ENUM("Hadir", "Izin", "Alpha"),
      defaultValue: "Alpha",
    },
    keterangan: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    type: {
      type: Sequelize.ENUM("Awal", "Akhir"),
      allowNull: false,
    },
    lokasi: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    answer: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });
  return Absensi;
};
