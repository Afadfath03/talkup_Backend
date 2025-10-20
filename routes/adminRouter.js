const express = require("express");
const router = express.Router();
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const adminController = require("../controllers/adminController");

router.post(
  "/add-guru-bk",
  verifyToken,
  verifyRole("super_admin"),
  adminController.addGuruBk
);
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
