const mongoose = require('mongoose');
require('dotenv').config();

// Menggunakan schema produk yang sama dengan server.js
const produkSchema = new mongoose.Schema({
  nama: String,
  harga: Number,
  deskripsi: String,
  gambar: String,
  kategori: String
}, { timestamps: true });

const Produk = mongoose.model('Produk', produkSchema);

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB terhubung untuk seeder...');

    // Hapus data lama (opsional, uncomment jika ingin reset)
    // await Produk.deleteMany();
    
    // Periksa apakah sudah ada produk
    const count = await Produk.countDocuments();
    if (count > 0) {
      console.log(`Sudah ada ${count} produk di database. Seeder tidak perlu dijalankan.`);
      process.exit(0);
    }

    const dummyProducts = [
      {
        nama: "Core Chronograph",
        harga: 1850000,
        deskripsi: "Jam tangan minimalis dengan strap kulit premium.",
        gambar: "/uploads/dummy-watch.jpg",
        kategori: "ELECTRONICS"
      },
      {
        nama: "Studio 1 ANC",
        harga: 3490000,
        deskripsi: "Headphone over-ear dengan Active Noise Cancellation.",
        gambar: "/uploads/dummy-headphone.jpg",
        kategori: "ELECTRONICS"
      },
      {
        nama: "Sonic Bloom",
        harga: 890000,
        deskripsi: "Speaker bluetooth portable dengan suara jernih.",
        gambar: "/uploads/dummy-speaker.jpg",
        kategori: "HOME"
      },
      {
        nama: "Optic X-Pro",
        harga: 12990000,
        deskripsi: "Kamera mirrorless profesional untuk segala kondisi.",
        gambar: "/uploads/dummy-camera.jpg",
        kategori: "ELECTRONICS"
      },
      {
        nama: "Lumina Desk Lamp",
        harga: 450000,
        deskripsi: "Lampu kerja cerdas dengan pengaturan suhu cahaya.",
        gambar: "/uploads/dummy-lamp.jpg",
        kategori: "HOME"
      }
    ];

    await Produk.insertMany(dummyProducts);
    console.log('Berhasil menambahkan data dummy produk!');
    
    process.exit(0);
  } catch (err) {
    console.error('Error saat seeding database:', err);
    process.exit(1);
  }
};

seedProducts();
