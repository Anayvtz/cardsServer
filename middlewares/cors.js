const cors = require("cors");
const corsmiddleware = cors({
    origin: ["127.0.0.1:5500",
        "http://localhost:5173"
    ]
});
module.exports = corsmiddleware;