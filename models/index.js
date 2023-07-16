'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const { development, connectDatabase } = require('../configs/database')
const basename = path.basename(__filename)
const db = {}

// connect database
const { sequelize } = connectDatabase(development.database)

// import models into db
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    )
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model
  })

// create associations between models
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

// exports sequelize connection and Object
db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
