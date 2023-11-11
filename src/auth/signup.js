const express = require("express");
const hash = require("../lib/auth/hash");
const { user: User } = require("../model");
const signupRouter = express.Router();

signupRouter.post("/", async (req, res, next) => {
    console.log("signup", req.body);
    const { username, password } = req.body;
    let userData = {};

    try {
        
        const hashPassword = await hash.hashText(password, 10);

        const userObj = new User({
            username,
            password: hashPassword,
        });
    
        userData = await userObj.save(userObj);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            statusCode: 500,
            errorMessage: "Unable to create user!",
        });
    }
    

    res.status(200).send(JSON.stringify({
        statusCode: 200,
        message: "This is signup page!",
        data: userData, 
    }));

    
});

signupRouter.get("/getUsers", async (req, res, next) => {
    const userData = await User.find();
    console.log(userData);
    res.send(userData);
})

module.exports = signupRouter;
