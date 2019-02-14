/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('venues', {
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
    venuecontact_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    addresscontact_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    byfoot: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    bycar: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    bypublictransport: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    refreshments: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    parking: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    steps: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    disabled_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    toilet_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    dog_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    furtherinfo: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'venues',
    timestamps: false
  });
};
