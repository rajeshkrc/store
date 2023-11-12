const express = require("express");
const productRouter = express.Router();
const { getProducts } = require("../lib/product/product.lib");

productRouter.get("/", getProducts);

module.exports = productRouter;
