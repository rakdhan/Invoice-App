'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Customer extends Model { 
    get caps(){
      let a = this.notes
      return `${a.toUpperCase()}`
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