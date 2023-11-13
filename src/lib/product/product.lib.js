const request = require("request");
const { user: User } = require("../../model");
const { validateToken } = require("../auth/jwt.lib");
const { getResponseObject } = require("../auth/util.lib");
const { 
  resStatusCode,
  jwtSecretKey,
  tokenHeaderKey,
  productsApi,
} = require("../../config");

module.exports.getProducts = async (req, res, next) => {
  const header = req.header(tokenHeaderKey);
  let resData = {};

  try {
    const token = header.split(' ')[1];
    const decode = validateToken(token, jwtSecretKey);

    if (decode) {
      const userData = await User.findOne({ _id: decode.userid }, { _id: 1, token: 1 });
      
      if (userData && userData.token === token) {
          request({
              uri: productsApi,            
          }).pipe(res);
          
          return;

      } else {
        resData = getResponseObject(resStatusCode.error, "", "Invalid request");
      }
    }    else {
      resData = getResponseObject(resStatusCode.error, "", "Invalid token");
    }

  } catch (err) {
    resData = getResponseObject(resStatusCode.error, "", "Invalid token");    
  }   
  
  res.status(resData.statusCode).json(resData);
};
