// src/app.js
import express from 'express';
import cors from 'cors';
import paymentRoutes from './routes/paymentRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Health route
app.get('/', (req, res) => {
  res.send('Mock Payment Service — healthy');
});

// Payment routes
app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Mock Payment Service running on port ${PORT}`));
