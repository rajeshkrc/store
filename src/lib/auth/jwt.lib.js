const jwt = require('jsonwebtoken');

/**
 * Takes two arguments and generate jwt token
 * @param {Object} data 
 * @param {String} secretKey 
 * @param {Object} options 
 * @returns {String}
 */
module.exports.genrateToken = (data, secretKey, options = {}) => {
    const expiresIn = options.expiresIn ? options.expiresIn : '1h';
    const token = jwt.sign(data, secretKey, { expiresIn });

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
