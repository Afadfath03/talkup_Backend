const { users } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cari user berdasarkan email
    const user = await users.findOne({ where: { email } });
    if (!user)
      return res.status(404).json({ message: "Email tidak ditemukan" });

    // Cek kecocokan password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Password salah" });

    // Buat token JWT
    const token = jwt.sign(
      {
        id_user: user.id_user,
        role: user.role,
        id_ref: user.id_ref,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Hapus password dari data yang dikirim ke client
    const { password: _, ...secureUserData } = user.toJSON();

    // Response sukses
    res.status(200).json({
      message: "Login berhasil",
      data: secureUserData,
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
