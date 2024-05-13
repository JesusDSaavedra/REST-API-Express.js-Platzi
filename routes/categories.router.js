const express = require('express');
const faker = require('faker');

const router = express.Router();

router.get('/:categorieId/products/:productId', (req, res) => {
  const { categorieId, productId } = req.params;
  res.json({
    categorieId,
    productId,
    name: 'Product 8',
    price: '29.99',
  });
});

module.exports = router;
