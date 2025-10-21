const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       ['Auth']
 *     summary: Login pengguna (Super Admin, Guru BK, Siswa)
 */
router.post("/login", authController.login);

module.exports = router;
