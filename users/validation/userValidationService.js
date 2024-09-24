const registerValidation = require("./Joi/registerValidation");
const loginValidation = require("./Joi/loginValidation");

const validator = "Joi";

const validateRegistration = (user) => {
    if (validator === "Joi") {
        const { error } = registerValidation(user);
        if (error) return error.details[0].message;
        return "";
    }
};

const validateLogin = (user) => {
    if (validator === "Joi") {
        const { error } = loginValidation(user);
        if (error) return error.details[0].message;
        return "";
    }
};

exports.validateRegistration = validateRegistration;
exports.validateLogin = validateLogin;