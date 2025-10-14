const router = require("express").Router();

const Example = require("./exampleRouter");

router.use("/example", Example);

module.exports = router;
