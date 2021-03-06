/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('authgroup_relatesto_authperms', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    authgroup_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    authperm_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    }
  }, {
    tableName: 'authgroup_relatesto_authperms',
    timestamps: false
  });
};
