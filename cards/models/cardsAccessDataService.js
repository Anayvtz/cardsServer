const { createError } = require("../../utils/handleErrors");
const Card = require("./mongodb/Card");
const createCard = async (newCard) => {
    try {
        let card = new Card(newCard);
        card = await card.save();
        return card;
    } catch (error) {
        createError("Mongoose ", error);
    }
};
const getCards = async () => {
    try {
        let cards = await Card.find();
        return cards;
    } catch (error) {
        createError("Mongoose ", error);
    }
};
const getCard = async (cardId) => {
    try {
        let card = await Card.findById(cardId);
        return card;
    } catch (error) {
        createError("Mongoose ", error);
    }
};
/* const getMyCards = async (userId) => {
    try {
        const cards = await Card.find(userId);
        return cards;
    } catch (error) {
        throw new Error("Mongoose " + error.message);
    }
} */
const getMyCards = async (userId) => {
    try {
        let cards = await Card.find({ user_id: userId });
        return cards;
    } catch (error) {
        createError("Mongoose ", error);
    }
};
const updateCard = async (cardId, updatedCard) => {
    try {
        const card = await Card.findByIdAndUpdate(cardId, updatedCard, { new: true });
        return card;
    } catch (error) {
        createError("Mongoose ", error);
    }
}

const changeBizNumber = async (cardid, newBiz) => {
    try {
        const card = Card.findByIdAndUpdate(cardid, newBiz);
    } catch (error) {
        createError("Mongoose ", error);
    }
}

const likeCard = async (cardId, userId) => {
    try {
        let card = await Card.findById(cardId);
        if (!card) {
            const err = new Error("card not found");
            err.status = 404;
            createError("mongoose", err);
        }
        if (card.likes.includes(userId)) {
            card.likes = card.likes.filter(id => id !== userId);
        } else {
            card.likes.push(userId);
        }
        card = await card.save();
        return card;
    } catch (error) {
        createError("Mongoose ", error);
    }
}
const deleteCard = async (cardId) => {
    try {
        let card = await Card.findByIdAndDelete(cardId);
        return card;
    } catch (error) {
        createError("Mongoose ", error);
    }
};
module.exports = { createCard, getCards, getMyCards, updateCard, changeBizNumber, getCard, deleteCard, likeCard };