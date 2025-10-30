const express = require("express");
const router = express.Router();
const konselingController = require("../controllers/konselingController");
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");

router.post("/", verifyToken, verifyRole("siswa"), konselingController.createKonseling); 
/*
  #swagger.tags = ['Konseling']
  #swagger.summary = 'Buat permintaan konseling'
  #swagger.description = 'Endpoint untuk siswa membuat permintaan konseling.'
  #swagger.security = [{ "bearerAuth": [] }]
*/
module.exports = router;