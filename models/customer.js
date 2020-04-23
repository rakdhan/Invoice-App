'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Customer extends Model { }

  Customer.init({
    notes: DataTypes.STRING
  }, { sequelize });

  Customer.associate = function(models) {
    Customer.belongsToMany(models.Menu, { through: models.Order })
    // associations can be defined here
  };
  return Customer;
};