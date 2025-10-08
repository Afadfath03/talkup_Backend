# 🗣️ TalkUp Backend

**TalkUp** adalah platform konsultasi online yang dikembangkan untuk memfasilitasi komunikasi antara siswa SMK Telkom dengan pihak BK.
Proyek ini dibuat menggunakan **Node.js**, **Express**, dan **Sequelize ORM** sebagai backend utama.

---

## 🚀 Tech Stack

- **Node.js** – Runtime environment
- **Express.js** – Framework web
- **Sequelize** – ORM untuk koneksi database
- **MySQL** – Database utama
- **dotenv** – Konfigurasi environment
- **Nodemon** – Development tool

---

## 📁 Struktur Folder

```
server/
├── config/
│   └── database.js
├── controllers/
│   └── userController.js
├── models/
│   └── index.js
├── routes/
│   └── userRoutes.js
├── index.js
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

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Buat File `.env`

Salin isi dari `.env.example` ke file baru bernama `.env` dan sesuaikan isinya:

```
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=talkup_db
DB_DIALECT=mysql
PORT=3000
```

### 4️⃣ Setup Database

Pastikan MySQL sudah berjalan, lalu buat database:

```sql
CREATE DATABASE talkup_db;
```

Kemudian jalankan migration (jika sudah dibuat):

```bash
npx sequelize db:migrate
```

### 5️⃣ Jalankan Server

Mode development (dengan auto-reload):

```bash
npm run dev
```

Atau mode normal:

```bash
npm start
```

Server berjalan di:
👉 [http://localhost:3000](http://localhost:3000)

---

## 🧩 API Testing

Gunakan Postman atau Insomnia untuk mengetes endpoint.

Contoh endpoint:

```
GET /api/users
POST /api/users/login
```

---

## 🧑‍💻 Kontributor

| Nama      | Role                          |
| --------- | ----------------------------- |
|           | Backend Developer / Team Lead |
| [Teman 1] | Frontend Developer            |
| [Teman 2] | UI/UX Designer                |
| [Teman 3] | Documentation & QA            |

---

## 🧾 Catatan

- Pastikan file `.env` tidak diunggah ke GitHub.
- Untuk setup database baru, gunakan `sequelize-cli` agar lebih mudah.
- Semua dokumen pendukung (surat, laporan, dsb) ada di folder Google Drive tim.

---

✨ **Project ini merupakan bagian dari mata kuliah TPLM dan Proyek Tingkat 3** – Telkom University Purwokerto
