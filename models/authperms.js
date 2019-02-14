/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('authperms', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'authperms',
    timestamps: false
  });
};
