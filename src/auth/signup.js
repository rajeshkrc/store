const express = require("express");
const { check, validationResult }   = require('express-validator');
const hash = require("../lib/auth/hash.lib");
const { getResponseObject } = require("../lib/auth/util.lib");
const { resStatusCode, validationConfig } = require("../config");
const { user: User } = require("../model");
const signupRouter = express.Router();

const validations = [
    check('username', validationConfig.username.msg)
    .isLength({ min: validationConfig.username.min, max: validationConfig.username.max }),
    check('password', validationConfig.password.msg)
    .isLength({ min: validationConfig.password.min, max: validationConfig.password.max }),
];

signupRouter.post("/", validations, async (req, res, next) => {
    
    let { username, password } = req.body;
    let resData = {}; 

    try {
    
        const validateResult = validationResult(req);
        
        if (validateResult.isEmpty()) {
            username = username.toLocaleLowerCase();
            const user = await User.findOne({ username }, { _id: 1 });
            
            if (!user) {

                const hashPassword = await hash.hashText(password, 10);
                const userData = await User.create({
                    username,
                    password: hashPassword,
                });
                
                resData = getResponseObject(resStatusCode.success, "User registered successfuly!", "", userData);                
                
            } else {                
               resData = getResponseObject(resStatusCode.error, "", "Username already exists");             
            }
        } else {            
            resData = getResponseObject(resStatusCode.error, "",  validateResult.errors.map(err => err.msg));   
        }
        
    } catch (err) {
        resData = getResponseObject(resStatusCode.error, "",  "Unable to register user");        
    }
    
    res.status(resData.statusCode).json(resData);
});

module.exports = signupRouter;
