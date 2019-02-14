/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pages', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    uri: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    published: {
      type: DataTypes.DATE,
      allowNull: false
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false
    },
    weight: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    draft: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    abstract: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    htmlbody: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'pages',
    timestamps: false
  });
};
