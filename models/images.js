/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('images', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    filename: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    author: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'images',
    timestamps: false
  });
};
