// routes/userRouter.js
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

// contoh endpoint untuk user melihat profilnya
router.get("/profile", verifyToken, userController.getProfile);

module.exports = router;
