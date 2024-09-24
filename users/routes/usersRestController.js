const express = require("express");


const { registerUser, getUser, getUsers, loginUser } = require("../models/userAccessDataService");
const auth = require("../../auth/authService");
const { handleError } = require("../../utils/handleErrors");
const { validateRegistration, validateLogin } = require("../validation/userValidationService");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const error = validateRegistration(req.body);
        if (error) return handleError(res, 400, `Joi Error: ${error}`);
        let user = await registerUser(req.body);
        res.send(user);
    } catch (error) {

        handleError(res, 400, error.message);
    }
});
router.post("/login", async (req, res) => {
    try {
        const error = validateLogin(req.body);
        if (error) return handleError(res, 400, `Joi Error: ${error}`);
        let { email, password } = req.body;
        const token = await loginUser(email, password);
        res.send(token);
    } catch (error) {

        handleError(res, 400, error.message);
    }
});
router.get("/:id", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { id } = req.params;
        if (userInfo._id != id && !userInfo.isAdmin) {
            return res.status(403).send("only same user or admin can get user info");
        }
        let user = await getUser(id);
        res.send(user);
    } catch (error) {
        handleError(res, 400, error.message);
    }
});
router.get("/", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        if (!userInfo.isAdmin) {
            return res.status(403).send("only admin can see all users");
        }
        let users = await getUsers();
        res.send(users);
    } catch (error) {
        handleError(res, 400, error.message);
    }
});
router.delete("/:id", (req, res) => {

    handleError(res, 405, "no one is allowed to delete user");
})
module.exports = router;