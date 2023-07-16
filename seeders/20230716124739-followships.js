'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    // total 50 followships
    await queryInterface.bulkInsert('Followships',
      Array.from({ length: 50 }, () => ({
        created_at: new Date(),
        updated_at: new Date(),
        follower_id: users[Math.floor(Math.random() * users.length)].id,
        following_id: users[Math.floor(Math.random() * users.length)].id
      }))
    )
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Followships', {})
  }
}
