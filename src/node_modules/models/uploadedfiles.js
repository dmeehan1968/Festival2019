/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('uploadedfiles', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    filename: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    filepath: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    mimetype: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    size: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'uploadedfiles',
    timestamps: false
  });
};
