"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashed = await bcrypt.hash("fitri123", 10);

    await queryInterface.bulkInsert("users", [
      {
        email: "bufitri@talkup.id",
        password: hashed,
        role: "guru_bk",
        id_ref: 5, // id Bu Fitri di tabel guru_bks
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "users",
      { email: "bufitri@talkup.id" },
      {}
    );
  },
};
