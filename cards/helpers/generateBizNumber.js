const _ = require("lodash");
const Card = require("../models/mongodb/Card");
const { createError } = require("../../utils/handleErrors");
const generateBizNumber = async () => {
    let cardsCount = await Card.countDocuments();
    if (cardsCount === 9_000_000) {
        const err = new Error("You reached to the maximum cards count in your system");
        err.status = 409;
        createError("mongoose", err);
    }
    let random;
    do {
        random = _.random(1_000_000, 9_999_999);
    } while (await isBizNumberExists(random));
    return random;
};
const isBizNumberExists = async (bizNumber) => {
    try {
        const cardWithThisBizNumber = await Card.findOne({ bizNumber });
        return Boolean(cardWithThisBizNumber);
    } catch (error) {
        const err = new Error("Mongoose " + error.message);
        err.status = 500;
        createError("mongoose", err);
    }
};
module.exports = { generateBizNumber };