import { Router, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import {
  AssessmentSession,
  StudentProfile,
  FiroBScore,
  TraitScore,
  UserArchetypeResult,
  UserCareerRecommendation,
} from '../models/index.js';

const router = Router();

// ──────────────────────────────────────────
// POST /api/assessment/session — Create new assessment session
// ──────────────────────────────────────────
router.post('/session', async (req: Request, res: Response): Promise<void> => {
  try {
    const session = await AssessmentSession.create({
      sessionToken: randomUUID(),
      userId: req.body.userId || null,
      status: 'in_progress',
    });
    res.status(201).json(session);
  } catch (error) {
    console.error('[Assessment Route] Error creating session:', error);
    res.status(500).json({ error: 'Failed to create assessment session' });
  }
});

// ──────────────────────────────────────────
// GET /api/assessment/session/:token — Get session by token
// ──────────────────────────────────────────
router.get('/session/:token', async (req: Request, res: Response): Promise<void> => {
  try {
    const session = await AssessmentSession.findOne({ sessionToken: req.params.token });
    if (!session) {
      res.status(404).json({ error: 'Session not found' });
      return;
    }
    res.json(session);
  } catch (error) {
    console.error('[Assessment Route] Error fetching session:', error);
    res.status(500).json({ error: 'Failed to fetch session' });
  }
});

// ──────────────────────────────────────────
// POST /api/assessment/profile — Save student profile
// ──────────────────────────────────────────
router.post('/profile', async (req: Request, res: Response): Promise<void> => {
  try {
    const profile = await StudentProfile.create(req.body);
    res.status(201).json(profile);
  } catch (error) {
    console.error('[Assessment Route] Error saving profile:', error);
    res.status(500).json({ error: 'Failed to save student profile' });
  }
});

// ──────────────────────────────────────────
// POST /api/assessment/firo-b/scores — Save FIRO-B scores
// ──────────────────────────────────────────
router.post('/firo-b/scores', async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId, eiScore, wiScore, ecScore, wcScore, eaScore, waScore } = req.body;
    const scores = await FiroBScore.findOneAndUpdate(
      { sessionId },
      { eiScore, wiScore, ecScore, wcScore, eaScore, waScore, calculatedAt: new Date() },
      { upsert: true, new: true, runValidators: true }
    );

    // Mark FIRO-B as complete in session
    await AssessmentSession.findByIdAndUpdate(sessionId, { isFiroBComplete: true });

    res.status(201).json(scores);
  } catch (error) {
    console.error('[Assessment Route] Error saving FIRO-B scores:', error);
    res.status(500).json({ error: 'Failed to save FIRO-B scores' });
  }
});

// ──────────────────────────────────────────
// POST /api/assessment/trait-scores — Save cognitive trait scores
// ──────────────────────────────────────────
router.post('/trait-scores', async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId, analytical, technical, creative, leadership, people } = req.body;
    const scores = await TraitScore.findOneAndUpdate(
      { sessionId },
      { analytical, technical, creative, leadership, people, calculatedAt: new Date() },
      { upsert: true, new: true, runValidators: true }
    );

    // Mark custom assessment as complete in session
    await AssessmentSession.findByIdAndUpdate(sessionId, { isCustomComplete: true });

    res.status(201).json(scores);
  } catch (error) {
    console.error('[Assessment Route] Error saving trait scores:', error);
    res.status(500).json({ error: 'Failed to save trait scores' });
  }
});

// ──────────────────────────────────────────
// POST /api/assessment/archetype — Save archetype result
// ──────────────────────────────────────────
router.post('/archetype', async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await UserArchetypeResult.findOneAndUpdate(
      { sessionId: req.body.sessionId },
      req.body,
      { upsert: true, new: true, runValidators: true }
    );
    res.status(201).json(result);
  } catch (error) {
    console.error('[Assessment Route] Error saving archetype:', error);
    res.status(500).json({ error: 'Failed to save archetype result' });
  }
});

// ──────────────────────────────────────────
// POST /api/assessment/recommendations — Save career recommendations
// ──────────────────────────────────────────
router.post('/recommendations', async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId, recommendations } = req.body;
    // Bulk upsert recommendations
    const ops = recommendations.map((rec: any) => ({
      updateOne: {
        filter: { sessionId, careerId: rec.careerId },
        update: { $set: rec },
        upsert: true,
      }
    }));
    await UserCareerRecommendation.bulkWrite(ops);
    
    // Mark session as completed
    await AssessmentSession.findByIdAndUpdate(sessionId, {
      status: 'completed',
      completedAt: new Date(),
    });

    res.status(201).json({ message: 'Recommendations saved', count: recommendations.length });
  } catch (error) {
    console.error('[Assessment Route] Error saving recommendations:', error);
    res.status(500).json({ error: 'Failed to save recommendations' });
  }
});

// ──────────────────────────────────────────
// GET /api/assessment/results/:sessionId — Get full assessment results
// ──────────────────────────────────────────
router.get('/results/:sessionId', async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId } = req.params;

    const [session, firoBScores, traitScores, archetype, recommendations] = await Promise.all([
      AssessmentSession.findById(sessionId),
      FiroBScore.findOne({ sessionId }),
      TraitScore.findOne({ sessionId }),
      UserArchetypeResult.findOne({ sessionId }).populate('archetypeId'),
      UserCareerRecommendation.find({ sessionId }).sort({ matchScore: -1 }),
    ]);

    if (!session) {
      res.status(404).json({ error: 'Session not found' });
      return;
    }

    res.json({
      session,
      firoBScores,
      traitScores,
      archetype,
      recommendations,
    });
  } catch (error) {
    console.error('[Assessment Route] Error fetching results:', error);
    res.status(500).json({ error: 'Failed to fetch assessment results' });
  }
});

export default router;
