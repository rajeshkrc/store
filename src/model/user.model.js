module.exports = mongoose => {
    const User = mongoose.model(
        "users",
        mongoose.Schema({
            username: String,
            password: String,
        },
        { timestamp: true }
    ));

   return User;     
};
