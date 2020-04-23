'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Customer extends Model { 
    capss(){ 
      console.log('qwewe')
      // return `${this.notes.toUpperCase()}`
      return 'AAA'
    }
  }

  Customer.init({
    notes: DataTypes.STRING
  }, { sequelize });

  Customer.addHook('beforeCreate', (instance, options) => { //by addHook
    if(!instance.notes) {instance.notes = '-'}
  })

  Customer.associate = function(models) {
    Customer.belongsToMany(models.Menu, { through: models.Order })
    // associations can be defined here
  };
  return Customer;
};