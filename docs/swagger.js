const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "TalkUp API Documentation",
    description:
      "Dokumentasi otomatis API TalkUp (Super Admin, Guru BK, dan Siswa).",
    version: "1.0.0",
  },
  host: "localhost:3000",
  basePath: "/api/v1",
  schemes: ["http"],
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "Masukkan token JWT (format: Bearer <token>)",
    },
  },
  security: [{ bearerAuth: [] }],
};

const outputFile = "./swagger-output.json";
const routes = ["./routes/index.js"];

swaggerAutogen(outputFile, routes, doc);
