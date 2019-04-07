/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notes_relatesto_contacts', {
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
    note_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    }
  }, {
    tableName: 'notes_relatesto_contacts',
    timestamps: false
  });
};
