'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // Get user IDs from the database
    const guruBk = await queryInterface.sequelize.query(
      `SELECT u.id 
       FROM users u 
       INNER JOIN guru_bks g ON u.id_ref = g.id 
       WHERE u.role = 'guru_bk' 
       ORDER BY g.id`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const siswa = await queryInterface.sequelize.query(
      `SELECT u.id 
       FROM users u 
       INNER JOIN siswas s ON u.id_ref = s.id 
       WHERE u.role = 'siswa' 
       ORDER BY s.id`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // If no users found, skip seeding
    if (guruBk.length === 0 || siswa.length === 0) {
      console.log('No users found. Skipping diskusi seeder.');
      return;
    }

    const now = new Date();
    const seedData = [
      // Discussion from Guru BK
      {
        id_pembuat: guruBk[0].id,
        topik: 'Tips Belajar Efektif',
        isi_diskusi: 'Hai semua! Sebagai guru BK, saya ingin berbagi beberapa tips belajar efektif yang bisa kalian terapkan. Bagaimana pengalaman belajar kalian selama ini?',
        is_anonim: false,
        tgl_post: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        jumlah_balasan: 3,
        created_at: now,
        updated_at: now
      },
      // Discussion from Student
      {
        id_pembuat: siswa[0].id,
        topik: 'Manajemen Waktu',
        isi_diskusi: 'Saya seringkali kesulitan membagi waktu antara sekolah, les, dan istirahat. Ada saran dari teman-teman atau guru BK?',
        is_anonim: false,
        tgl_post: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        jumlah_balasan: 2,
        created_at: now,
        updated_at: now
      },
      // Another discussion from Guru BK
      {
        id_pembuat: guruBk[1].id,
        topik: 'Persiapan Ujian Nasional',
        isi_diskusi: 'Mari kita diskusikan persiapan menghadapi ujian nasional. Apa saja kendala yang kalian hadapi?',
        is_anonim: false,
        tgl_post: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        jumlah_balasan: 1,
        created_at: now,
        updated_at: now
      },
      // Another discussion from Student
      {
        id_pembuat: siswa[2].id,
        topik: 'Ekstrakurikuler Pilihan',
        isi_diskusi: 'Saya bingung memilih ekstrakurikuler yang sesuai dengan minat dan bakat. Ada saran?',
        is_anonim: true,
        tgl_post: now,
        jumlah_balasan: 0,
        created_at: now,
        updated_at: now
      }
    ];

    await queryInterface.bulkInsert('diskusi', seedData);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('diskusi', null, {});
  }
};