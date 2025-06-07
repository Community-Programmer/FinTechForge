import { RequestHandler, Router } from 'express';
import {
  getSkillChallenges,
  getSkillChallengeById,
  createSkillChallenge,
  updateSkillChallenge,
  deleteSkillChallenge,
} from './skillChallengeController';

const router = Router();

router.get('/', getSkillChallenges);
router.get('/:id', getSkillChallengeById as RequestHandler);
router.post('/', createSkillChallenge);
router.patch('/:id', updateSkillChallenge);
router.delete('/:id', deleteSkillChallenge);

export default router;
