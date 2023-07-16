'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // total 8 categories
    await queryInterface.bulkInsert('Categories',
      ['Bakery', 'Coffee Shop', 'Clothing Shop', 'Drugstore', 'Florist', 'Hardware Store', 'Supermarket', 'Stationery Store']
        .map(item => {
          return {
            name: item,
            created_at: new Date(),
            updated_at: new Date()
          }
        }
        ), {})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', {})
  }
}
