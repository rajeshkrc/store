const express = require("express");
const hash = require("../lib/auth/hash");
const { user: User } = require("../model");
const loginRouter = express.Router();

loginRouter.post("/", async (req, res, next) => {
    const { username, password } = req.body;
    
    try {
        
        const userData = await User.findOne({ username });
        const resData = {};

        if (!userData.username) {
            resData.errorMessage = "User does not exist";        
        } else {
            const isPasswordMatch = await hash.compareText(password, userData.password);
            isPasswordMatch ? resData.data = userData : resData.errorMessage = "Invalid password"; 
                       
        }
        resData.statusCode = resData.errorMessage ? 401 : 200;
    
        res.status(resData.statusCode).send(resData); 

    } catch (err) {
        console.log(err);
        res.status(500).send({
            statusCode: 500,
            errorMessage: "Unable to validate user!",
        });
    }       
});

module.exports = loginRouter;
