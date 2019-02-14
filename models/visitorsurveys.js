/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('visitorsurveys', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
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
      type: DataTypes.STRING(255),
      allowNull: true
    },
    subscribe: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    location: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    events: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    guide: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    website: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    visit: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    friend: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ip_address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    communityoffice: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    service: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    additional: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    services: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'visitorsurveys',
    timestamps: false
  });
};
