const thoughts = require("./thought-routes.js");
const users = require("./user-routes.js");
const router = require("express").Router();

router.use("/thoughts", thoughts);
router.use("/users", users);

module.exports = router;