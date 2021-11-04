const mongoose =  require('mongoose');

const userSchema = mongoose.Schema({
    id: String,
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String
    }
});

const User = mongoose.model("Users", userSchema);

module.exports = User;