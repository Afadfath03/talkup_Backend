const express = require("express");
const router = express.Router();
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const adminController = require("../controllers/adminController");

/**
 * @swagger
 * /api/v1/admin/add-guru-bk:
 *   post:
 *     tags: ['Super Admin']
 *     summary: Tambah data guru BK
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Guru BK berhasil ditambahkan
 */
router.post(
  "/add-guru-bk",
  verifyToken,
  verifyRole("super_admin"),
  adminController.addGuruBk
);

/**
 * @swagger
 * /api/v1/admin/add-siswa:
 *   post:
 *     tags: ['Super Admin']
 *     summary: Tambah data siswa
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: siswa berhasil ditambahkan
 */
router.post(
  "/add-siswa",
  verifyToken,
  verifyRole("super_admin"),
  adminController.addSiswa
);

router.get(
  "/users",
  verifyToken,
  verifyRole("super_admin"),
  adminController.getAllUsers
);

module.exports = router;
