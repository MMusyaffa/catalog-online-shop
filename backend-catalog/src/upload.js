const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Set tempat penyimpanan gambar di server
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Endpoint untuk upload gambar
router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Simpan URL gambar yang bisa diakses secara publik
    const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    res.json({ imageUrl });
});

module.exports = router;
