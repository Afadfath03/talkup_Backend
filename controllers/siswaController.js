// // controllers/siswaController.js
// const { GuruBK, Siswa } = require("../models");

// const getSiswaBimbinganByGuruBK = async (req, res) => {
//   try {
//     const guruBkId = req.user.guruBkId; // dari JWT login guru bk
//     const guru = await GuruBK.findByPk(guruBkId, {
//       include: {
//         model: Siswa,
//         as: "siswa_bimbingan",
//       },
//     });

//     if (!guru) {
//       return res.status(404).json({
//         message: "Guru BK tidak ditemukan",
//       });
//     }

//     res.status(200).json({
//       message: "Berhasil mengambil data siswa bimbingan",
//       total: guru.siswa_bimbingan.length,
//       data: guru.siswa_bimbingan,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Gagal mengambil siswa bimbingan",
//       error: error.message,
//     });
//   }
// };

// module.exports = { getSiswaBimbinganByGuruBK };
