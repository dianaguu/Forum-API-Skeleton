'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Objective extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Objective.belongsTo(models.Category, { foreignKey: 'categoryId' })
      Objective.hasMany(models.Comment, { foreignKey: 'objectiveId' })
      Objective.belongsToMany(models.User, {
        through: models.Favorite,
        foreignKey: 'objectiveId',
        as: 'FavoriteUsers'
      })
    }
  }
  Objective.init({
    name: DataTypes.STRING,
    telephone: DataTypes.STRING,
    address: DataTypes.STRING,
    openingHours: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    views: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Objective',
    tableName: 'Objectives',
    underscored: true
  })
  return Objective
}
