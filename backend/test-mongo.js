const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;
console.log('MONGO_URI ada?', uri ? 'YA' : 'TIDAK');
if (uri) {
    // Tampilkan URI tanpa password (hanya untuk debug)
    const maskedUri = uri.replace(/\/\/(.*):(.*)@/, '//***:***@');
    console.log('Masked URI:', maskedUri);
}

mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000, // timeout 5 detik
})
.then(() => {
    console.log('✅ Koneksi MongoDB sukses!');
    process.exit(0);
})
.catch(err => {
    console.error('❌ Gagal koneksi:', err.message);
    console.error('Detail error:', err);
    process.exit(1);
});

// Tambahkan timeout fallback
setTimeout(() => {
    console.error('❌ Timeout: Tidak ada respons dari MongoDB dalam 10 detik');
    process.exit(1);
}, 10000);