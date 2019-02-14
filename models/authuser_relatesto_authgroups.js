/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('authuser_relatesto_authgroups', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    authuser_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    authgroup_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    }
  }, {
    tableName: 'authuser_relatesto_authgroups',
    timestamps: false
  });
};
