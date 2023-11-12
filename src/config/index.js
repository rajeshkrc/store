const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 3000;
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const resStatusCode = {
    ok: 200,
    success: 201,
    unautherization: 401,
    error: 500,
};

const validationConfig = { 
    username: { min: 4, max: 12, msg: 'Username length must be 4 to 12 characters' },
    password: { min: 8, max: 12, msg: 'Password length must be 8 to 12 characters' },
};

module.exports = {
    port,
    resStatusCode,
    validationConfig,
    jwtSecretKey,
};
