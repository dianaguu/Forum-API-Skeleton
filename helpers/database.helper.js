// connect database
const { connectDatabase } = require('../configs/database')
const { sequelize, database } = connectDatabase('')

// create database if it doesn't exist
sequelize.query(`CREATE DATABASE IF NOT EXISTS ${database}`)
  .then(() => {
    console.log('Database created successfully or checked')
    process.exit(0)
  })
  .catch((err) => {
    console.error('Unable to create database:', err)
  })
