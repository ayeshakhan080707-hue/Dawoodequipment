import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { seedDatabase } from './seed.js';

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import equipmentRoutes from './routes/equipmentRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import shipmentRoutes from './routes/shipmentRoutes.js';
import sellOfferRoutes from './routes/sellOfferRoutes.js';
import statsRoutes from './routes/statsRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import taxonomyRoutes from './routes/taxonomyRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allow frontend Vite dev server & production client
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health Check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'online',
    system: 'Dawood Equipment Co. Core API',
    version: '2.5.0',
    timestamp: new Date().toISOString()
  });
});

// Mount API Routes
app.use('/api/upload', uploadRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/shipments', shipmentRoutes);
app.use('/api/sell-offers', sellOfferRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/taxonomy', taxonomyRoutes);

// Serve Vite frontend build in production
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
      return next();
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Error handling middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[API Error]:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Connect to MongoDB and start Express server
const startServer = async () => {
  try {
    await connectDB();
    // Auto-seed initial admin and datasets on first launch
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`=======================================================`);
      console.log(`  DAWOOD EQUIPMENT CO. - BACKEND API SERVER RUNNING    `);
      console.log(`  URL: http://localhost:${PORT}                       `);
      console.log(`  MONGODB: Connected & Initialized                    `);
      console.log(`  ADMIN SEED: admin@dawoodequipment.com / admin123    `);
      console.log(`=======================================================`);
    });
  } catch (error: any) {
    console.error('Failed to start server:', error.message);
  }
};

startServer();

export default app;
