import { Application, Router } from 'express';
import passport from 'passport';
import {
  getUserStats,
  updateUserStats,
  addXpAndCheckLevelUp,
  checkAndUpdateStreak,
  getFlashcardDecks,
} from './userStatsController';
import {
  updateUserStatsSchema,
  addXpSchema,
} from '../validator/userStatsValidator';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

// All routes require authentication
router.use(passport.authenticate('jwt', { session: false }));

// User stats endpoints
router.get('/', getUserStats as Application);
router.put('/',validateRequest(updateUserStatsSchema as any), updateUserStats as Application);
router.post('/add-xp', validateRequest(addXpSchema), addXpAndCheckLevelUp as Application);
router.get('/check-streak', checkAndUpdateStreak as Application);
router.get('/flashcard-decks', getFlashcardDecks as Application);

export default router;
