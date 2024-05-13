const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15).messages({
  'string.base': `"nombre" debe ser un tipo de 'texto'`,
  'string.empty': `"nombre" no puede ser un campo vacío`,
  'string.min': `"nombre" debe tener una longitud mínima de {#limit}`,
  'string.max': `"nombre" debe tener una longitud máxima de {#limit}`,
});
const price = Joi.number().integer().min(10);
const img = Joi.string().uri();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  img: img.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  img: img,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
};
