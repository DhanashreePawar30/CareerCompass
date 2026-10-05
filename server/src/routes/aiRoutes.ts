import { Router, Request, Response } from 'express';
import { synthesizeFiroB } from '../services/ai/firoBSynthesisService.js';

const router = Router();

/**
 * POST /api/ai/firob-synthesis
 * Enriches calculated FIRO-B results with AI personalized interpretation.
 */
router.post('/firob-synthesis', async (req: Request, res: Response): Promise<void> => {
  try {
    // Optional auth / session header check (non-blocking for demo/session token)
    const userAuthHeader = req.headers['authorization'] || req.headers['x-user-email'];
    if (userAuthHeader) {
      console.log(`[FIRO-B AI Route] Request received for authenticated context: ${userAuthHeader}`);
    }

    const synthesisResult = await synthesizeFiroB(req.body);
    res.status(200).json(synthesisResult);
  } catch (error) {
    console.error('[FIRO-B AI Route] Unexpected error:', error);
    // Never crash or expose internal stack traces
    res.status(500).json({
      error: 'An error occurred while generating FIRO-B synthesis.',
      fallbackAvailable: true
    });
  }
});

export default router;
