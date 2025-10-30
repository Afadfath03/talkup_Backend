'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Konseling extends Model {
    static associate(models) {
      Konseling.belongsTo(models.siswa, {
        foreignKey: "id_siswa",
        as: "siswa",
      });

      Konseling.belongsTo(models.guru_bk, {
        foreignKey: "id_guru_bk",
        as: "guru_bk",
      });
    }
  }
  Konseling.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    // id_siswa dan id_guru_bk akan otomatis dibuat oleh Sequelize
    // berdasarkan 'foreignKey' di relasi associate
    jenis_sesi: {
      type: DataTypes.ENUM('Online', 'Offline'),
      allowNull: false
    },
    topik_konseling: {
      type: DataTypes.ENUM('Pribadi', 'Sosial', 'Belajar', 'Karir'),
      allowNull: false
    },
    deskripsi_masalah: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Menunggu', 'Disetujui', 'Selesai'),
      allowNull: false,
      defaultValue: 'Menunggu'
    },
    tgl_pengajuan: {
      type: DataTypes.DATEONLY, // Menggunakan DATEONLY agar sesuai dengan tipe 'DATE' di Postgres
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Konseling',
    tableName: 'konseling',
    // Kita set 'createdAt' agar menggunakan kolom 'tgl_pengajuan'
    // dan menonaktifkan 'updatedAt'
    timestamps: true,
    createdAt: 'tgl_pengajuan',
    updatedAt: false, 
    freezeTableName: true // Agar nama tabel tidak diubah menjadi plural oleh Sequelize
  });
  return Konseling;
};