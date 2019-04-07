/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('venue_relatesto_tags', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    venue_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    tag_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    }
  }, {
    tableName: 'venue_relatesto_tags',
    timestamps: false
  });
};
