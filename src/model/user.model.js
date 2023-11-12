module.exports = mongoose => {
    const User = mongoose.model(
        "users",
        mongoose.Schema({
            username: { 
             type: String,
             unique: true,
             required: true,
             minLength: [4, 'Username must be at least 4 characters'],
             maxLength: [12, 'Username must not be more than 12 characters'],
            },
            password: { 
             type: String,
             required: true,           
            },
        },
        { timestamps: true }
    ));

   return User;     
};
