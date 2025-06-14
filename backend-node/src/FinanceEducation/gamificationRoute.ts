import { Router } from 'express';
import passport from 'passport';
import {
  getGamificationSummary,
  completeModule,
  addAchievement,
  getAchievements,
  getSkillTrees,
  updateSkillTree,
} from './gamificationController';
import { Application } from 'express-serve-static-core';
import {
  completeModuleSchema,
  addAchievementSchema,
  updateSkillTreeSchema,
} from '../validator/gamificationValidator';
import { validateRequest } from '../middleware/validateRequest';


const router = Router();

// All routes require authentication
router.use(passport.authenticate('jwt', { session: false }));

router.get('/summary', getGamificationSummary as Application);
router.post('/complete-module',validateRequest(completeModuleSchema), completeModule as Application);
router.post('/achievement',  validateRequest(addAchievementSchema),addAchievement as Application);
router.get('/achievements', getAchievements as Application);
router.get('/skill-trees', getSkillTrees as Application);
router.post('/skill-tree', validateRequest(updateSkillTreeSchema),updateSkillTree as Application);

export default router;
