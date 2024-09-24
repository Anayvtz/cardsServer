const { createError, handleError } = require("../utils/handleErrors");
const { verifyToken } = require("./providers/jwt");
const config = require("config");
const tokenGenerator = config.get("TOKEN_GENERATOR");
const auth = (req, res, next) => {
    if (tokenGenerator === "jwt") {
        try {
            const tokenFromClient = req.header("x-auth-token");
            if (!tokenFromClient) {
                const err = new Error("Authentication Error: Please Login");
                err.status = 401;
                createError("auth", err);
            }
            const userInfo = verifyToken(tokenFromClient);
            if (!userInfo) {
                const err = new Error("Authentication Error: Unauthorize user");
                err.status = 401;
                createError("auth", err);
            }
            req.user = userInfo;
            return next();
        } catch (error) {
            return handleError(res, 401, error.message);
        }
    }
    return handleError(res, 500, "you did not used valid token generator");
};
module.exports = auth;