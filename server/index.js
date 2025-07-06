// index.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./router');
const { startBot } = require('./botBridge');

const app = express();
const PORT = 3000;

// 🔧 Middleware umum
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 🔐 Session management
app.use(session({
  secret: 'super-secret-key', // ganti dengan key yang lebih aman di production
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 hari
    httpOnly: true,
    secure: false // true jika pakai HTTPS
  }
}));

// 🌍 Serve file statis dari folder public
app.use(express.static(path.join(__dirname, '../public')));

// 📦 Routing
app.use('/', router);

// ❌ 404 - Halaman tidak ditemukan
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../public/404.html'));
});

// 🚀 Jalankan server
app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});

// 🤖 Jalankan bot WhatsApp
startBot();
