module.exports = {
    url: `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@mongodb:${process.env.MONGODB_LOCAL_PORT}/${process.env.MONGODB_DATABASE}`,
};
