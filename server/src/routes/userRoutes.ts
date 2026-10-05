import { Router, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { z } from 'zod';
import { UserProgress } from '../models/index.js';

const router = Router();

const EmailParamSchema = z.string().trim().toLowerCase().email();

const ProgressBodySchema = z.object({
  personal: z.record(z.string()).default({}),
  academic: z.record(z.unknown()).default({}),
  firoBAnswers: z.record(z.number().int().min(1).max(6)).default({}),
  customAnswers: z.record(z.string()).default({}),
  firoBScores: z.record(z.number()).nullable().default(null),
  firoBScoreVersion: z.literal('normalized-v1').optional(),
  isFiroBComplete: z.boolean().default(false),
  isCustomComplete: z.boolean().default(false),
  firoBAiInsight: z.record(z.unknown()).nullable().default(null),
  clientSavedAt: z.number().default(() => Date.now()),
});

// Fail fast instead of letting mongoose buffer requests while the DB is down
router.use((_req: Request, res: Response, next: NextFunction) => {
  if (mongoose.connection.readyState !== 1) {
    res.status(503).json({ error: 'Database unavailable' });
    return;
  }
  next();
});

// ──────────────────────────────────────────
// GET /api/users/:email/progress — Load a user's saved progress
// ──────────────────────────────────────────
router.get('/:email/progress', async (req: Request, res: Response): Promise<void> => {
  const email = EmailParamSchema.safeParse(req.params.email);
  if (!email.success) {
    res.status(400).json({ error: 'Invalid email' });
    return;
  }
  try {
    const progress = await UserProgress.findOne({ email: email.data }).lean();
    if (!progress) {
      res.status(404).json({ error: 'No saved progress' });
      return;
    }
    res.json(progress);
  } catch (error) {
    console.error('[User Route] Error loading progress:', error);
    res.status(500).json({ error: 'Failed to load progress' });
  }
});

// ──────────────────────────────────────────
// PUT /api/users/:email/progress — Create or replace a user's saved progress
// ──────────────────────────────────────────
router.put('/:email/progress', async (req: Request, res: Response): Promise<void> => {
  const email = EmailParamSchema.safeParse(req.params.email);
  const body = ProgressBodySchema.safeParse(req.body);
  if (!email.success || !body.success) {
    res.status(400).json({ error: 'Invalid progress payload' });
    return;
  }
  try {
    const progress = await UserProgress.findOneAndUpdate(
      { email: email.data },
      { $set: { ...body.data, email: email.data } },
      { upsert: true, new: true, runValidators: true }
    ).lean();
    res.json(progress);
  } catch (error) {
    console.error('[User Route] Error saving progress:', error);
    res.status(500).json({ error: 'Failed to save progress' });
  }
});

export default router;
