const {siswa} = require("../models");

const createKonseling = async (req, res, next) => {
  try {
    const { topik_konseling, deskripsi_masalah, jenis_sesi} = req.body;
    const siswaId = req.user.id_ref;
    /* const randomGuruBk = await siswa.sequelize.query(
      `SELECT gb.id FROM guru_bks gb
       ORDER BY RANDOM()
       LIMIT 1;`,
      { type: siswa.sequelize.QueryTypes.SELECT }
    ); */
    const siswaLogin = await siswa.findOne({ where: { id: siswaId } });
    if (!siswaLogin) {
      return res.status(404).json({
        message: "Siswa tidak ditemukan.",
      });
    }

    // bisa berdasarkan request id guru bk atau sesuai plottingan dari table siswa :)
    const id_guru_bk = req.body.id_guru_bk || siswaLogin.guruBkId;
    if (!id_guru_bk) {
      return res.status(400).json({
        message: "Siswa belum memiliki guru BK yang ditugaskan.",
      });
    }

    const newKonseling = await siswa.sequelize.models.Konseling.create({
        id_siswa: siswaId,
        id_guru_bk,
        jenis_sesi,
        topik_konseling,
        deskripsi_masalah
      });


      //Sesuai format yang ada di github issue 
      //JSON { "message": "Pengajuan konseling berhasil dibuat", "data": { "id_konseling": 12, "status": "Menunggu" } }
    const msgKonseling = {
      id_konseling: newKonseling.id,
      status: newKonseling.status
    };
    /* res.status(201).json({
      message: "Konseling berhasil dibuat",
      konseling: newKonseling,
    }); */
      res.status(201).json({
      message: "Pengajuan konseling berhasil dibuat",
      data: msgKonseling,
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  createKonseling,
};