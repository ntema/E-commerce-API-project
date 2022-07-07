const Product = require("../models/products");
const slugify = require("slugify");
const Joi = require("joi");
const addProductService = require("../services/productsServices/addProductService");

const Schema = new Joi.object({
  review: Joi.string().required(),
  rating: Joi.number().required(),
});

module.exports = async (req, res) => {
  try {
    const { body } = req;
    const { error, value } = Schema.validate(body);
    console.log(error);
    if (error) {
      // return res.json(error);
      return res.json({ error: { message: error.details[0].message } });
    }
    const by = req.user._id;
    const prodId = req.params.id;

    const product = await Product.findOneAndUpdate(
      { _id: prodId },
      {
        $push: { review: { review: value.review, rating: value.rating, by } },
        $inc: {
          "reviewCounts.totalRating": value.rating,
          "reviewCounts.numberOfRatings": 1,
        },
      },
      { new: true }
    );
    // console.log(product);
    return res.status(201).json(product);
  } catch (error) {}
};
