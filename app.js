const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const { registerUser, getUser, getUsers } = require("./users/models/userAccessDataService");
const connectToDb = require("./DB/dbService");
const router = require("./router/router");
const corsmiddleware = require("./middlewares/cors");
const { handleError } = require("./utils/handleErrors");
const chalk = require("chalk");

const app = express();
app.use(corsmiddleware);
app.use(express.json());
app.use(express.static("./public"))
app.use((req, res, next) => {
    console.log("new req");
    next();

});
app.use((req, res, next) => {
    console.log(
        `Request URL: ${req.url} | Method: ${req.method} | Time: ${new Date()}`
    );
    next();
});
app.use(morgan("tiny"));
app.use((err, req, res, next) => {
    const msg = err || "internal error of the server";
    handleError(res, 500, msg);
});
app.use(router);


app.get("/", async (req, res) => {
    console.log("Request has been accepted at " + new Date());
    try {

        res.send("hello world");
    } catch (error) {
        res.status(400).send(error.message);
    }
});


app.listen(8182, () => {
    console.log(chalk.yellow("server is listening to port 8182"));
    connectToDb();
});