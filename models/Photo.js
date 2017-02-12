module.exports = (sequelize, DataTypes) => {
  let Photo  = sequelize.define("Photo", {
    author: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {}
  });
  return Photo;
};