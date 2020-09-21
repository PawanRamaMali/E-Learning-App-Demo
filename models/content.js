module.exports = (sequelize, DataTypes) => {
  const Content = sequelize.define("Content", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Content.associate = (models) => {
  //   Content.belongsToMany(models.Lesson, {
  //     through: "lesson_content",
  //     foreignKey: "contentId",
  //     otherKey: "lessonId",
  //   });
  // };

  return Content;
};
