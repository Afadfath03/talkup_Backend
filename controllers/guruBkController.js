const { siswa, guru_bk } = require("../models");

exports.getSiswaBimbingan = async (req, res) => {
  console.log("Dari token:", req.user);

  try {
    // Pastikan hanya role guru_bk yang bisa mengakses
    if (req.user.role !== "guru_bk") {
      return res.status(403).json({
        message: "Akses ditolak. Hanya guru BK yang bisa melihat data ini.",
      });
    }

    // Ambil id guru BK dari token
    const guruBkId = req.user.id_ref;

    if (!guruBkId) {
      return res.status(400).json({
        message: "Token tidak valid, id_ref guru BK tidak ditemukan",
      });
    }

    // Ambil siswa bimbingan
    const list = await siswa.findAll({
      where: { guruBkId },
      include: [
        {
          model: guru_bk,
          as: "guru_bk",
          attributes: ["nama", "jabatan"],
        },
      ],
    });

    res.status(200).json({
      message: "Berhasil mengambil data siswa bimbingan",
      total: list.length,
      data: list,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil siswa bimbingan",
      error: error.message,
    });
  }
};
