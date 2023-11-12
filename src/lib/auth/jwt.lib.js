const jwt = require('jsonwebtoken');

module.exports.genrateToken = (data, secretKey) => {
    const token = jwt.sign(data, secretKey, { expiresIn: '1h' });

    return token;
};

module.exports.validateToken = (token, jwtSecretKey) => {
    const verified = jwt.verify(token, jwtSecretKey);

    return verified;
};
