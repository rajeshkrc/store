const jwt = require('jsonwebtoken');

/**
 * Takes two arguments and generate jwt token
 * @param {Object} data 
 * @param {String} secretKey 
 * @returns {String}
 */
module.exports.genrateToken = (data, secretKey) => {
    const token = jwt.sign(data, secretKey, { expiresIn: '1h' });

    return token;
};

/**
 * Takes two arguments and return decoded object value
 * after successfully verify token
 * @param {String} token 
 * @param {String} jwtSecretKey 
 * @returns {Object}
 */
module.exports.validateToken = (token, jwtSecretKey) => {
    const verified = jwt.verify(token, jwtSecretKey);

    return verified;
};
