const { Schema, model } = require("mongoose");

const ReviewSchema = new Schema(
  {
    rating: {
      type: Number,
      default: 0,
    },
    review: {
      type: String,
      required: true,
    },
    by: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const TotalReviewSchema = new Schema(
  {
    totalRating: {
      type: Number,
      default: 0,
    },
    numberOfRatings: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 1000,
  },
  category: {
    type: String,
    enum: ["fashion", "shoes", "babies", "babies things"],
  },
  description: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  catSlug: {
    type: String,
  },
  titleSlug: {
    type: String,
  },
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  review: {
    type: [ReviewSchema],
  },
  reviewCounts: {
    type: TotalReviewSchema,
    default: {},
  },
});

const populateUser = function (next) {
  this.populate("addedBy", "_id email firstName");
  next();
};

ProductSchema.pre("find", populateUser)
  .pre("findOne", populateUser)
  .pre("findOneAndUpdate", populateUser);

const Product = model("Product", ProductSchema);

module.exports = Product;
