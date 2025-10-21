const router = require("express").Router();

const Example = require("./exampleRouter");
const adminRouter = require("./adminRouter");
const guruBkRouter = require("./guruBkRouter");
const authRouter = require("./authRouter");

router.use("/example", Example);
router.use("/admin", adminRouter);
router.use("/guru-bk", guruBkRouter);
router.use("/auth", authRouter);

module.exports = router;
