'use strict'

const { faker } = require('@faker-js/faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = await queryInterface.sequelize.query(
      'SELECT id FROM Categories;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    // total 50 objectives
    await queryInterface.bulkInsert('Objectives',
      Array.from({ length: 50 }, () => ({
        name: faker.company.name(),
        telephone: faker.phone.number(),
        address: faker.address.streetAddress(true),
        opening_hours: '10:10',
        image: `https://loremflickr.com/320/240/storefront/?random=${Math.random() * 100}`,
        description: faker.lorem.text(),
        created_at: new Date(),
        updated_at: new Date(),
        category_id: categories[Math.floor(Math.random() * categories.length)].id
      })), {})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Objectives', {})
  }
}
