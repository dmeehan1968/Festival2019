/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('contacts', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    firstname: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lastname: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    organisation: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    telephone: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    mobile: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    website: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    address1: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    address2: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    address3: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    town: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    county: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    postcode: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    tableName: 'contacts',
    timestamps: false
  });
};
