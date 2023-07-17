const Sequelize = require('sequelize')

// database config
const development = {
  username: 'root',
  password: 'password',
  database: 'database_development',
  host: '127.0.0.1',
  dialect: 'mysql'
}
const production = {
  use_env_variable: 'CLEARDB_DATABASE_URL'
}

// database connection
const connectDatabase = (databaseName) => {
  let sequelize
  let database
  if (process.env.NODE_ENV !== 'production') {
    sequelize = new Sequelize(databaseName, development.username, development.password, {
      host: development.host,
      dialect: development.dialect
    })
    database = development.database
  } else {
    sequelize = new Sequelize(process.env[production.use_env_variable])
    database = production.use_env_variable.split('/').pop().split('?')[0]
  }
  return { sequelize, database }
}

module.exports = {
  development,
  production,
  connectDatabase
}
