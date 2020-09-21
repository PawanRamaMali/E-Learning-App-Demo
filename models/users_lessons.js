module.exports = (sequelize, DataTypes) => {
  const Users_Lessons = sequelize.define("Users_Lessons", {
    lessonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      allowNull: false,
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
  return Users_Lessons;
};
