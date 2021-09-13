
const db = require("../models");
const Product = db.products;
// const Op = db.Sequelize.Op;
const axios = require('axios');

exports.create = (req, res) => {
  if (!req.body.productName) {
    res.status(400).send(" productName can not be empty !"
    )
    return;
  }
  else if (!req.body.productPrice) {
    res.status(400).send(" productPrice can not br empty !"
    )
    return;
  }

  const product = {
    productName: req.body.productName,
    productPrice: req.body.productPrice,
  };


  Product.create(product)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    });
};


exports.currency = (req, res) => {

  const cuss = axios(`https://api.fastforex.io/fetch-multi?from=USD&to=USD,CAD,EUR,GBP&api_key=1cfd875201-c0a7dfc44f-qzcxvb`)

    .then(res => res.data)
    .then(data => {

      const result = {
        USD: data.results.USD,
        CAD: data.results.CAD,
        EUR: data.results.EUR,
        GBP: data.results.GBP
      }

      const id = req.params.id;
      Product.findByPk(id)
        .then(data => {
          if (data == null) {
            res.status(400).send("can not available Products with id=" + id)
            return;
          }
          const final = {
            USD: result.USD * data.productPrice,
            CAD: result.CAD * data.productPrice,
            EUR: result.EUR * data.productPrice,
            GBP: result.GBP * data.productPrice
          }

          Product.update(final, { where: { id: id } })
            .then(data => {
              res.send(final)
            })
            .catch(err => {
              res.status(500).send({
                message: "can not available Products with id=" + id
              });
            });
        })
    })
}
exports.findAll = (req, res) => {

  Product.findAll({
    limit: 5,
    order: [['count', 'DESC']]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Products."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Product.findByPk(id)
    .then(data => {
      const newCount = data.count + 1;
      Product.update(
        { count: newCount },
        { where: { id: id } }
      ).then(data => res.data)
      res.send(data);

    })
    .catch(err => {
      res.status(500).send({
        message: "can not available Products with id=" + id
      });
    });

};


exports.delete = (req, res) => {
  const id = req.params.id;

  Product.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: ` Product with id=${id} was deleted successfully!`
        });
      } else {
        res.send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id
      });
    });
  return;
};

