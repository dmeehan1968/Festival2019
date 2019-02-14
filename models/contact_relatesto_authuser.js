/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('contact_relatesto_authuser', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    contact_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    authuser_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    }
  }, {
    tableName: 'contact_relatesto_authuser',
    timestamps: false
  });
};
