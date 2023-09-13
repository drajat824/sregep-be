module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define("students", {
    uuid: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    studentId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tag: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    groupId: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    adminId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    publicKey: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });
  return Student;
};
