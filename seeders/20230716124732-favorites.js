'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const objectives = await queryInterface.sequelize.query(
      'SELECT id FROM Objectives;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    // total 50 favorites
    await queryInterface.bulkInsert('Favorites',
      Array.from({ length: 50 }, () => ({
        created_at: new Date(),
        updated_at: new Date(),
        objective_id: objectives[Math.floor(Math.random() * objectives.length)].id,
        user_id: users[Math.floor(Math.random() * users.length)].id
      }))
    )
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Favorites', {})
  }
}
