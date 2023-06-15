const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: {
        type: [mongoose.Types.ObjectId],
        ref: 'User',
    },
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("User", userSchema);
