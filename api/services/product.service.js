const faker = require('faker');
const { resolve } = require('path');
const boom = require('@hapi/boom');

class ProductService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        img: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }
  async find() {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(this.products);
      }, 5000);
    });
  }
  async findOne(id) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }
  async update(id, data) {
    const productIdx = this.products.findIndex((prod) => prod.id === id);

    if (productIdx !== -1) {
      this.products[productIdx] = {
        ...this.products[productIdx],
        ...data,
      };
      return this.products[productIdx];
    }

    throw boom.notFound('product not found');
  }

  async delete(id) {
    const productIdx = this.products.findIndex((prod) => prod.id === id);
    if (productIdx !== -1) {
      this.products.splice(productIdx, 1);
      return id;
    }
    throw boom.notFound('product not found');
  }
}

module.exports = ProductService;
