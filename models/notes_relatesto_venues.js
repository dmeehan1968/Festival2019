/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notes_relatesto_venues', {
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
    note_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    }
  }, {
    tableName: 'notes_relatesto_venues',
    timestamps: false
  });
};
