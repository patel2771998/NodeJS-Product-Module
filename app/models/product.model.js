module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("products", {
    productName: {
      type: Sequelize.STRING
    },
    productPrice: {
      type: Sequelize.INTEGER
    },
    currency: {
      type: Sequelize.STRING,
      defaultValue:"USD"
    },
    count: {
      type: Sequelize.INTEGER,
      defaultValue: '0',

    }
  });

  return Product;
};