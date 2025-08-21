import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import itemRoutes from './routes/ItemRoute.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('uploads')); // Agar gambar bisa diakses dari frontend

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder tempat menyimpan gambar
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nama file unik
    }
});

const upload = multer({ storage });

// Endpoint untuk upload file
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    res.json({ imageUrl: `http://localhost:3000/${req.file.filename}` });
});

app.use('/api', itemRoutes);

app.listen(port, () => {
    console.log(`Server Running on Port: ${port}`);
});
