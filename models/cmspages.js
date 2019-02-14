/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cmspages', {
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
      allowNull: false
    },
    abstract: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    weight: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false
    },
    modified: {
      type: DataTypes.DATE,
      allowNull: false
    },
    published: {
      type: DataTypes.DATE,
      allowNull: false
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false
    },
    draft: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    navigation: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    sitemap: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    search: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    }
  }, {
    tableName: 'cmspages',
    timestamps: false
  });
};
