const express = require("express");
const productRouter = express.Router();
const { getProducts } = require("../lib/product/product.lib");

/**
 * url: /api/products
 * method: get
 * response: On success { statusCode: 200, message: "success", data: {object} }
 * On fail { statusCode: 500, errMessage: ["error message"] }
 */
productRouter.get("/", getProducts);

module.exports = productRouter;
