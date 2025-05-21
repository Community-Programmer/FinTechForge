import { Router } from 'express';
import passport from 'passport';
import {
  getGamificationSummary,
  completeModule,
  addAchievement,
  getAchievements,
  getSkillTrees,
  updateSkillTree,
} from './gamificationController.js';
import { Application } from 'express-serve-static-core';

const router = Router();

// All routes require authentication
router.use(passport.authenticate('jwt', { session: false }));

router.get('/summary', getGamificationSummary as Application);
router.post('/complete-module', completeModule as Application);
router.post('/achievement', addAchievement as Application);
router.get('/achievements', getAchievements as Application);
router.get('/skill-trees', getSkillTrees as Application);
router.post('/skill-tree', updateSkillTree as Application);

export default router;
