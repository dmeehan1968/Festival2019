/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('authrole_relatesto_authperms', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    authrole_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    authperm_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    }
  }, {
    tableName: 'authrole_relatesto_authperms',
    timestamps: false
  });
};
