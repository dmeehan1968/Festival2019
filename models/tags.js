/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tags', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    tag_category_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    }
  }, {
    tableName: 'tags',
    timestamps: false
  });
};
