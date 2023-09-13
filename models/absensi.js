module.exports = (sequelize, Sequelize) => {
  const Absensi = sequelize.define("absensi", {
    jadwalId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    teacherId: {
      type: Sequelize.STRING,
    },
    absenId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.ENUM("Awal", "Akhir"),
      allowNull: false,
    },
    maxTime: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    lokasi: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    question: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });
  return Absensi;
};
