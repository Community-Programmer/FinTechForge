import { RequestHandler, Router } from 'express';
import {
  getRewards,
  getRewardById
} from './rewardController.js';

const router = Router();

router.get('/', getRewards);
router.get('/:id', getRewardById as RequestHandler);

export default router; 