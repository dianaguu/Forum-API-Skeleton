'use strict'

const bcrypt = require('bcryptjs')

async function seedUser (index) {
  const email = `user${index + 3}@example.com`
  const hashedPassword = await bcrypt.hash('12345678', 10)
  const isAdmin = false
  const name = `user${index + 3}`
  const image = `https://loremflickr.com/300/300/headshot/?random=${Math.random() * 100}`
  const createdAt = new Date()
  const updatedAt = new Date()
  return {
    email,
    password: hashedPassword,
    is_admin: isAdmin,
    name,
    image,
    created_at: createdAt,
    updated_at: updatedAt
  }
}
async function seedUsers () {
  const tenSeedUsers = await Promise.all(Array.from({ length: 10 }, (_, index) => seedUser(index)))
  return tenSeedUsers
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // first three users (total 13 users)
    await queryInterface.bulkInsert('Users', [{
      email: 'root@example.com',
      password: await bcrypt.hash('12345678', 10),
      is_admin: true,
      name: 'root',
      image: `https://loremflickr.com/300/300/headshot/?random=${Math.random() * 100}`,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user1@example.com',
      password: await bcrypt.hash('12345678', 10),
      is_admin: false,
      name: 'user1',
      image: `https://loremflickr.com/300/300/headshot/?random=${Math.random() * 100}`,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user2@example.com',
      password: await bcrypt.hash('12345678', 10),
      is_admin: false,
      name: 'user2',
      image: `https://loremflickr.com/300/300/headshot/?random=${Math.random() * 100}`,
      created_at: new Date(),
      updated_at: new Date()
    }], {})

    // add ten more users to demonstrate the popular followings feature
    // /api/v1/popular/followings
    await queryInterface.bulkInsert('Users', await seedUsers(), {})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {})
  }
}
