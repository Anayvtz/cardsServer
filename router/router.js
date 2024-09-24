const express = require("express");
const cardsRouterController = require("../cards/routes/cardsRestController");
const usersRouterController = require("../users/routes/usersRestController");
const router = express.Router();
router.use("/cards", cardsRouterController);
router.use("/users", usersRouterController);
module.exports = router;