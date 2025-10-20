"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1️⃣ Tambahkan guru BK ke tabel guru_bk
    await queryInterface.bulkInsert("guru_bks", [
      {
        nama: "Bu Fitri",
        jabatan: "Guru BK SMK Telkom",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // 2️⃣ Ambil ID guru_bk yang baru ditambahkan
    const [guruBk] = await queryInterface.sequelize.query(
      `SELECT id FROM guru_bks WHERE nama = 'Bu Fitri' ORDER BY id DESC LIMIT 1;`
    );

    // 3️⃣ Hash password akun guru BK
    const hashedPassword = await bcrypt.hash("guru123", 10);

    // 4️⃣ Tambahkan user guru BK yang terhubung ke guru_bk.id
    await queryInterface.bulkInsert("users", [
      {
        email: "bukbk@smktelkom.sch.id",
        password: hashedPassword,
        role: "guru_bk",
        id_ref: guruBk[0].id, // ✅ aman, pasti ada id-nya
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", { role: "guru_bk" }, {});
    await queryInterface.bulkDelete("guru_bks", null, {});
  },
};
