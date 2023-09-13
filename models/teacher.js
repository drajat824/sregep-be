module.exports = (sequelize, Sequelize) => {
  const Teacher = sequelize.define("teacher", {
    uuid: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
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
    adminId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Teacher;
};
