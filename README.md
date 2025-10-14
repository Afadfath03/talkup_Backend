# 🗣️ TalkUp Backend

**TalkUp** adalah platform konseling online yang dikembangkan untuk memfasilitasi komunikasi antara siswa SMK Telkom Purwokerto dengan pihak kemahasiswaan (BK/Konselor).
Proyek ini menggunakan **Node.js**, **Express.js**, dan **Sequelize ORM** dengan **PostgreSQL** sebagai database utama.

---

## 🚀 Tech Stack

- **Node.js** – Runtime environment
- **Express.js** – Web framework
- **Sequelize ORM** – Object Relational Mapping untuk PostgreSQL
- **PostgreSQL** – Database utama
- **dotenv** – Konfigurasi environment
- **Nodemon** – Auto-reload saat development
- **Swagger UI Express** – Dokumentasi API

---

## 📁 Struktur Folder

```
talkup-backend/
├── bin/
│   └── www
├── config/
│   └── database.js
├── controllers/
│   ├── exampleController.js
│   └── systemController.js
├── docs/
│   └── swagger.json
├── models/
│   ├── example.js
│   └── index.js
├── routes/
│   ├── exampleRouter.js
│   ├── documentationRoute.js
│   └── index.js
├── server.js
├── .env.example
└── package.json
```

---

## ⚙️ Setup Project

### 1️⃣ Clone Repository

```bash
git clone https://github.com/nitafitrotul/talkup-backend.git
cd talkup-backend
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Buat File `.env`

Salin isi dari `.env.example` menjadi file `.env`, lalu sesuaikan dengan kredensial PostgreSQL kamu:

```
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_NAME=talkup_db
DB_HOST=127.0.0.1
DB_PORT=5432
PORT=3000
```

---

### 4️⃣ Setup Database

Pastikan PostgreSQL sudah berjalan, lalu buat database:

```sql
CREATE DATABASE talkup_db;
```

Jalankan migrasi untuk membuat tabel:

```bash
npx sequelize-cli db:migrate
```

Jika ingin menghapus dan mengulang migrasi:

```bash
npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:migrate
```

---

### 5️⃣ Jalankan Server

Mode development (auto reload):

```bash
npm run dev
```

Mode normal:

```bash
npm start
```

Server akan berjalan di:
👉 [http://localhost:3000](http://localhost:3000)

---

## 📘 Dokumentasi API (Swagger)

Swagger UI bisa diakses setelah server berjalan di:
👉 [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

Swagger menampilkan dokumentasi otomatis untuk semua endpoint API seperti:

- **GET /api/v1/example** → Mengambil semua data Example
- **POST /api/v1/example** → Menambahkan data Example baru

---

## 🧩 API Testing

Gunakan **Postman** atau **Insomnia** untuk mengetes endpoint.
Contoh:

```
GET /api/v1/example
POST /api/v1/example
```

Jika ingin menggunakan variabel di Postman:

1. Buat variabel `{{base_url}}`
2. Isi dengan `http://localhost:3000/api/v1`
3. Gunakan di setiap request seperti `{{base_url}}/example`

---

## 🧑‍💻 Kontributor

| Nama                     | Role                          |
| ------------------------ | ----------------------------- |
| **Nita Fitrotul Mar'ah** | Backend Developer / Team Lead |
| **[Teman 1]**            | Frontend Developer            |
| **[Teman 2]**            | UI/UX Designer                |
| **[Teman 3]**            | Documentation & QA            |

---

## 🧾 Catatan

- Pastikan file `.env` **tidak diunggah** ke GitHub.
- Gunakan `sequelize-cli` untuk manajemen migrasi, seed, dan model.
- Dokumentasi API tersedia otomatis lewat **Swagger**.
- Semua konfigurasi database ada di `config/database.js`.

---

✨ **Project ini merupakan bagian dari mata kuliah TPLM / Proyek Tingkat 3 – Telkom University Purwokerto.**
