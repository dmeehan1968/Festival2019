/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tag_categories', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    category: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    singular: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    plural: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'tag_categories',
    timestamps: false
  });
};
