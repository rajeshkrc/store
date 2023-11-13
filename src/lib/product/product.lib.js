const request = require("request");
const { validateToken } = require("../auth/jwt.lib");
const { getResponseObject } = require("../auth/util.lib");
const { resStatusCode, jwtSecretKey, tokenHeaderKey } = require("../../config");

module.exports.getProducts = (req, res, next) => {
  const header = req.header(tokenHeaderKey);
  let resData = {};

  try {
    const decode = validateToken(header.split(' ')[1], jwtSecretKey);

    if (decode) {        
        request({
            uri: 'https://dummyjson.com/products',            
        }).pipe(res);
    }

  } catch (err) {
    resData = getResponseObject(resStatusCode.error, "", "Invalid token");
    res.status(resData.statusCode).json(resData);
  }     
};
