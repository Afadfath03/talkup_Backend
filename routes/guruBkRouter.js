const express = require("express");
const router = express.Router();
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const guruBkController = require("../controllers/guruBkController");

/**
 * @swagger
 * /api/v1/guru-bk/siswa:
 *   get:
 *     tags:
 *       ['Guru BK']
 *     summary: Ambil semua siswa bimbingan untuk guru BK
 */
router.get(
  "/siswa",
  verifyToken,
  verifyRole("guru_bk"),
  guruBkController.getSiswaBimbingan
);

module.exports = router;
