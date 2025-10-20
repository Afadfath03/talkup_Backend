const { users, guru_bk, siswa } = require("../models");
const bcrypt = require("bcryptjs");

// 🧩 Tambah Guru BK
exports.addGuruBk = async (req, res) => {
  try {
    const { nama, jabatan, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const guru = await guru_bk.create({ nama, jabatan });
    const newUser = await users.create({
      id_ref: guru.id_guru_bk,
      role: "guru_bk",
      email,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ message: "Guru BK berhasil ditambahkan", user: newUser });
  } catch (error) {
    next(error);
  }
};

// 🧩 Tambah Siswa
exports.addSiswa = async (req, res) => {
  try {
    const { email_sekolah, nama_lengkap, kelas, email, password, guruBkId } =
      req.body;

    // ✅ Cek apakah email sudah terdaftar
    const existingUser = await users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Buat data siswa
    const newSiswa = await siswa.create({
      email_sekolah,
      nama_lengkap,
      kelas,
      guruBkId,
    });

    // ✅ Buat user login untuk siswa
    const newUser = await users.create({
      id_ref: newSiswa.id,
      role: "siswa",
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "✅ Siswa berhasil ditambahkan oleh Super Admin",
      data: {
        siswa: newSiswa,
        akun: {
          id_user: newUser.id_user,
          email: newUser.email,
          role: newUser.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// 🧩 Lihat Semua User
exports.getAllUsers = async (req, res) => {
  try {
    const data = await users.findAll();
    res.json({ total: data.length, data });
  } catch (error) {
    next(error);
  }
};
