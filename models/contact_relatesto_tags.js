/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('contact_relatesto_tags', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    contact_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    tag_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    }
  }, {
    tableName: 'contact_relatesto_tags',
    timestamps: false
  });
};
