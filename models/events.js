/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('events', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    subtitle: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    shortdesc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    longdesc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contact_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    bookingcontact_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    furtherinfo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    charginginfo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ageinfo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    venue_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    preferred_image_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    }
  }, {
    tableName: 'events',
    timestamps: false
  });
};
