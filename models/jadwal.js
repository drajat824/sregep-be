module.exports = (sequelize, Sequelize) => {
  const Jadwal = sequelize.define("jadwal", {
    groupId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ownerId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    day: {
      type: Sequelize.ENUM("Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"),
      allowNull: false,
    },
    subject: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    startTime: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    endTime: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    teacherId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    teacherName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    groupName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tag: {
      type: Sequelize.JSON,
      allowNull: true,
    },
  });
  return Jadwal;
};
