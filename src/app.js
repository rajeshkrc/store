const express = require("express");
const app = express();
const signupRouter = require("./auth/signup");
const loginRout = require("./auth/login");
const db = require("./model");

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connecte to database");
}).catch(error => {
    console.log("Cannot connect to the database!", error);
    process.exit();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/signup', signupRouter);
app.use('/login', loginRout);

module.exports = app;
