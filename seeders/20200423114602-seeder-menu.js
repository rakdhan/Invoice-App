'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Menus', [
      {
        name: 'Ayam Goreng',
        price: '10000',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Roasted Chicken',
        price: '15000',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ayam Telur Asin',
        price: '22000',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ikan Bakar',
        price: '31000',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Menus', null, {});
    
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
