import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const safeBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    cb(null, `${safeBase}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 200 * 1024 * 1024 // 200MB max for HD equipment walkaround video
  }
});

const router = Router();

// Single image upload
router.post('/image', upload.single('image'), (req, res): void => {
  if (!req.file) {
    res.status(400).json({ success: false, message: 'No image file uploaded' });
    return;
  }
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({
    success: true,
    url: fileUrl,
    filename: req.file.filename
  });
});

// Multiple gallery images upload
router.post('/images', upload.array('images', 20), (req, res): void => {
  const files = req.files as Express.Multer.File[];
  if (!files || files.length === 0) {
    res.status(400).json({ success: false, message: 'No image files uploaded' });
    return;
  }
  const urls = files.map(f => `${req.protocol}://${req.get('host')}/uploads/${f.filename}`);
  res.json({
    success: true,
    urls
  });
});

// Video walkaround upload
router.post('/video', upload.single('video'), (req, res): void => {
  if (!req.file) {
    res.status(400).json({ success: false, message: 'No video file uploaded' });
    return;
  }
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({
    success: true,
    url: fileUrl,
    filename: req.file.filename
  });
});

export default router;
