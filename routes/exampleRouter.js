const router = require("express").Router();
const { exampleController } = require("../controllers");

router.post("", exampleController.createExample);
router.get("", exampleController.getAllExample);
router.get("/:id", exampleController.getExampleById);
router.patch("/:id", exampleController.updateExample);
router.delete("/:id", exampleController.deleteExample);

module.exports = router;
