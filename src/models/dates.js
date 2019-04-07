/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dates', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    tableName: 'dates',
    timestamps: false
  });
};
