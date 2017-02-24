module.exports = (sequelize, DataTypes) => {
  let Photo  = sequelize.define("Photo", {
    author: DataTypes.TEXT,
    link: DataTypes.TEXT,
    description: DataTypes.TEXT
  }, {
    classMethods: {}
  });
  return Photo;
};