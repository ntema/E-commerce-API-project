module.exports = async ({ req, res, Schema, slugify, Product }) => {
  try {
    let { body, file } = req;
    // console.log(file);

    const { error, value } = Schema.validate(body);
    if (error) {
      return res.json({ error: { message: error.details[0].message } });
    }
    body.imageURL = file.path;
    const { _id } = req.user;
    console.log(_id);

    body.titleSlug = slugify(body.title);
    body.catSlug = slugify(body.category);

    const preProduct = new Product({ ...body, addedBy: _id });
    // console.log(preProduct);
    const product = await preProduct.save();
    return res.status(201).json(product);
  } catch (error) {
    console.log(error);
  }
};
