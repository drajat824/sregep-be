module.exports = (sequelize, Sequelize) => {
  const Group = sequelize.define("groups", {
    groupId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ownerId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tag: {
      type: Sequelize.JSON,
      allowNull: true,
    },
  });
  return Group;
};
