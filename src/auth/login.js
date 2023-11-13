const express = require("express");
const { check, validationResult } = require('express-validator');
const hash = require("../lib/auth/hash.lib");
const { genrateToken, validateToken } = require("../lib/auth/jwt.lib");
const { getResponseObject } = require("../lib/auth/util.lib");
const { resStatusCode, validationConfig, jwtSecretKey, tokenHeaderKey } = require("../config");
const { user: User } = require("../model");
const loginRouter = express.Router();

const validations = [
    check('username', validationConfig.username.msg)
    .isLength({ min: validationConfig.username.min, max: validationConfig.username.max }),
    check('password', validationConfig.password.msg)
    .isLength({ min: validationConfig.password.min, max: validationConfig.password.max }),
];

/**
 * url: /auth/api/login
 * method: POST
 * payload: { username: "test", password: "123456" }
 * response: On success { statusCode: 200, message: "success", data: {object} }
 * On fail { statusCode: 500, errMessage: ["error message"] }
 */
loginRouter.post("/login", validations, async (req, res, next) => {
    let { username, password } = req.body;
    let resData = {};

    try {
        const validateResult = validationResult(req);
        if (!validateResult.isEmpty()) {
            resData = getResponseObject(resStatusCode.error, "", validateResult.errors.map(err => err.msg));
            res.status(resStatusCode.error).json(resData);

            return;
        }

        username = username.toLocaleLowerCase();
        const userData = await User.findOne({ username });
        

        if (!userData || !userData.username) {
            resData.errorMessage = "Username does not exist";        
        } else {
            const isPasswordMatch = await hash.compareText(password, userData.password);
            isPasswordMatch ? resData.data = userData : resData.errorMessage = "Invalid password"; 
            
            if (isPasswordMatch) {
                const token = genrateToken({ userid: userData._id }, jwtSecretKey);
                resData.data = { ...resData.data._doc, token };
                await User.updateOne({ _id: userData._id }, { $set: { token } });
            }
        }
        resData.statusCode = resData.errorMessage ? resStatusCode.unautherization : resStatusCode.ok;
    
        resData = getResponseObject(resData.statusCode, "", resData.errorMessage, resData.data);        

    } catch (err) {
        resData = getResponseObject(resStatusCode.error, "", "Unable to validate user!");        
    }   
    
    res.status(resData.statusCode).json(resData); 
});

/**
 * url: /auth/api/logout
 * method: GET
 * response: On success { statusCode: 200, message: "success", data: {object} }
 * On fail { statusCode: 500, errMessage: ["error message"] }
 */
loginRouter.get("/logout", async (req, res, next) => {
  const header = req.header(tokenHeaderKey);
  let resData = {};
  try {
    const token = header.split(' ')[1];
    const decode = validateToken(token, jwtSecretKey);
    if (decode) {
        const userData = await User.findOne({ _id: decode.userid }, { _id: 1, token: 1 });

        if (userData && userData.token === token) {
            await User.updateOne({ _id: userData._id }, { $set: { token: "" } });
            resData = getResponseObject(resStatusCode.ok, "Logout successfully", "");
        } else {
            resData = getResponseObject(resStatusCode.error, "", "Invalid request");
        }
        
    } else {
        resData = getResponseObject(resStatusCode.error, "", "Invalid request");
    }

  } catch (err) {    
    resData = getResponseObject(resStatusCode.error, "", "Invalid request");    
  }
    
  res.status(resData.statusCode).json(resData); 
});

module.exports = loginRouter;
