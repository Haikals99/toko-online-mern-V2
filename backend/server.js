const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authRoutes = require('./Routes/authRoutes');

require('dotenv').config();

const app = express();

// ========== MIDDLEWARE ==========
app.use(cors());
app.use(express.json());

// ========== KONFIGURASI MULTER ==========

// Tentukan folder penyimpanan gambar
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

    const ext = path.extname(file.originalname);

    // Jika file tidak punya ekstensi, default .jpg
    const finalExt = ext ? ext : '.jpg';

    cb(null, uniqueSuffix + finalExt);
  }
});

// Gunakan konfigurasi storage
const upload = multer({ storage: storage });

// Buat folder uploads jika belum ada
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Middleware agar folder uploads bisa diakses browser
app.use('/uploads', express.static('uploads'));

// ========== KONEKSI MONGODB ==========
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB terhubung!'))
  .catch(err => console.log('Gagal koneksi:', err));

// ========== MODEL PRODUK ==========
const produkSchema = new mongoose.Schema({
  nama: String,
  harga: Number,
  deskripsi: String,
  gambar: String,
  kategori: String
}, { timestamps: true });

const Produk = mongoose.model('Produk', produkSchema);

// ========== ROUTES ==========

// GET semua produk
app.get('/api/produk', async (req, res) => {
  try {
    const produk = await Produk.find();

    res.json(produk);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// GET produk berdasarkan ID
app.get('/api/produk/:id', async (req, res) => {
  try {
    const produk = await Produk.findById(req.params.id);

    if (!produk) {
      return res.status(404).json({
        message: 'Produk tidak ditemukan'
      });
    }

    res.json(produk);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// POST tambah produk
app.post('/api/produk', upload.single('gambar'), async (req, res) => {
  try {

    // Jika tidak ada gambar yang diupload
    const gambarPath = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    const produkBaru = new Produk({
      nama: req.body.nama,
      harga: req.body.harga,
      deskripsi: req.body.deskripsi,
      gambar: gambarPath,
      kategori: req.body.kategori
    });

    await produkBaru.save();

    res.status(201).json(produkBaru);

  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
});

// PUT update produk
app.put('/api/produk/:id', upload.single('gambar'), async (req, res) => {
  try {

    const produk = await Produk.findById(req.params.id);

    if (!produk) {
      return res.status(404).json({
        message: 'Produk tidak ditemukan'
      });
    }

    // Update data teks
    produk.nama = req.body.nama || produk.nama;
    produk.harga = req.body.harga || produk.harga;
    produk.deskripsi = req.body.deskripsi || produk.deskripsi;
    produk.kategori = req.body.kategori || produk.kategori;

    // Jika upload gambar baru
    if (req.file) {
      produk.gambar = `/uploads/${req.file.filename}`;
    }

    await produk.save();

    res.json(produk);

  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
});

// DELETE produk
app.delete('/api/produk/:id', async (req, res) => {
  try {

    const produk = await Produk.findByIdAndDelete(req.params.id);

    if (!produk) {
      return res.status(404).json({
        message: 'Produk tidak ditemukan'
      });
    }

    res.json({
      message: 'Produk dihapus'
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// ========== ROUTE AUTH ==========
app.use('/api/auth', authRoutes);

// ========== MENJALANKAN SERVER ==========
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});