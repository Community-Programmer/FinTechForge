import { Application, Router } from 'express';
import passport from 'passport';
import {
  getUserStats,
  updateUserStats,
  addXpAndCheckLevelUp,
  checkAndUpdateStreak,
  getFlashcardDecks,
} from './userStatsController';

const router = Router();

// All routes require authentication
router.use(passport.authenticate('jwt', { session: false }));

// User stats endpoints
router.get('/', getUserStats as Application);
router.put('/', updateUserStats as Application);
router.post('/add-xp', addXpAndCheckLevelUp as Application);
router.get('/check-streak', checkAndUpdateStreak as Application);
router.get('/flashcard-decks', getFlashcardDecks as Application);

export default router;
