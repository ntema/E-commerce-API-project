const Product = require("../models/products");
const slugify = require("slugify");
const Joi = require("joi");
const addProductService = require("../services/productsServices/addProductService");

const Schema = new Joi.object({
  title: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
});

module.exports = async (req, res) => {
  addProductService({ req, res, Schema, slugify, Product });
};
