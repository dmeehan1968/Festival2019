/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('authusers', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: true
    },
    verified_ip: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    verified_timestamp: {
      type: DataTypes.DATE,
      allowNull: true
    },
    verified_expires: {
      type: DataTypes.DATE,
      allowNull: true
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true
    },
    previous_login: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'authusers',
    timestamps: false
  });
};
