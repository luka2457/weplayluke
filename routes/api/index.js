const router = require("express").Router();
const gameRoutes = require("./games");
const userRoutes = require("./users");
const sendMailRoutes = require("./sendMail");

// Book routes
router.use("/games", gameRoutes);

// user routes
router.use("/users", userRoutes);

// node mailer route
router.use("/sendMail", sendMailRoutes);


module.exports = router;
