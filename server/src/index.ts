import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createLead } from './controllers/leadController';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: ['http://localhost:5173', 'https://ваш-ник.github.io'], // замените на ваш GitHub Pages URL
  credentials: true
}));

app.use(express.json());

// Логирование всех запросов (для отслеживания проверок)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} | IP: ${req.ip}`);
  next();
});

app.post('/api/lead', createLead);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});