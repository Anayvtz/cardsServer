const mongoose = require("mongoose");
const { PHONE, EMAIL } = require("../../../helpers/mongodb/mongooseValidator");
const Image = require("../../../helpers/mongodb/Image");
const Address = require("../../../helpers/mongodb/Address");
const Name = require("../../../helpers/mongodb/Name");

const UserSchema = mongoose.Schema({
    name: Name,
    phone: PHONE,
    email: EMAIL,
    password: {
        type: String,
        trim: true,
    },
    image: Image,
    address: Address,
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isBusiness: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const User = mongoose.model("user", UserSchema);
module.exports = User;