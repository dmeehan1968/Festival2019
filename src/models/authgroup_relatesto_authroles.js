/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('authgroup_relatesto_authroles', {
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
    authrole_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    }
  }, {
    tableName: 'authgroup_relatesto_authroles',
    timestamps: false
  });
};
