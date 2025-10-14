const router = require("express").Router();
const { exampleController } = require("../controllers");

router.post("", exampleController.createExample);
router.get("", exampleController.getAllExample);
router.get("/:id", exampleController.getExampleById);
router.patch("/:id", exampleController.updateExample);
router.delete("/:id", exampleController.deleteExample);

router.get("/test-error", (req, res, next) => {
  const error = new Error("Test manual error handling");
  error.status = 400;
  next(error);
});

module.exports = router;
