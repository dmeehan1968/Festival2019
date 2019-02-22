/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('visitorsurvey_relatesto_disciplines', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    survey_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    tag_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    }
  }, {
    tableName: 'visitorsurvey_relatesto_disciplines',
    timestamps: false
  });
};
