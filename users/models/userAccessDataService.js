const { generateAuthToken } = require("../../auth/providers/jwt");
const { createError } = require("../../utils/handleErrors");
const { generateUserPassword, comaprePasswords } = require("../helpers/bcrypt");
const User = require("./mongodb/User");
const registerUser = async (newUser) => {
    try {
        newUser.password = generateUserPassword(newUser.password);
        let user = new User(newUser);
        user = await user.save();
        return ({
            _id: user._id,
            email: user.email,
            name: user.name
        });
    } catch (error) {
        createError("Mongoose ", error);
    }
};
const getUser = async (userId) => {
    try {
        let user = await User.findById(userId);
        return user;
    } catch (error) {
        createError("Mongoose ", error);
    }
};
const getUsers = async () => {
    try {
        let users = await User.find();
        return users;
    } catch (error) {
        createError("Mongoose ", error);
    }
};
const loginUser = async (email, password) => {
    try {
        const userFromDb = await User.findOne({ email });
        if (!userFromDb) {
            createError("Authentication Error:", " Invalid email or password");
        }
        //if (userFromDb.password !== password) {
        if (comaprePasswords(password, userFromDb.password) == false) {
            createError("Authentication Error:", " Invalid email or password");
        }
        const token = generateAuthToken(userFromDb);
        return token;
    } catch (error) {
        createError("ergeneral", error);
    }
};
module.exports = { registerUser, getUser, getUsers, loginUser };