import './config/env.js';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDatabase } from './config/db.js';
import aiRoutes from './routes/aiRoutes.js';
import assessmentRoutes from './routes/assessmentRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { isOpenAIConfigured, getOpenAIModel } from './services/ai/openaiClient.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// API Routes
app.use('/api/ai', aiRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'CareerCompass AI + Database Backend',
    aiConfigured: isOpenAIConfigured(),
    aiModel: getOpenAIModel(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// Start server after DB connection
async function startServer() {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`🧭 CareerCompass Backend running at http://localhost:${PORT}`);
      console.log(`   📡 AI routes:         /api/ai/*`);
      console.log(`   📊 Assessment routes:  /api/assessment/*`);
      console.log(`   👤 User routes:        /api/users/:email/progress`);
      console.log(`   🏥 Health check:       /api/health`);
      console.log(
        isOpenAIConfigured()
          ? `   🤖 OpenAI:             configured (model: ${getOpenAIModel()})`
          : '   🤖 OpenAI:             NOT configured — set OPENAI_API_KEY in server/.env (using deterministic fallback)'
      );
    });
  } catch (error) {
    console.error('[Server] Failed to start:', error);
    process.exit(1);
  }
}

startServer();
