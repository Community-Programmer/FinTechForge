import { RequestHandler, Router } from 'express';
import { getRewards, getRewardById } from './rewardController';
import { rewardIdParamSchema } from '../validator/rewardValidator';
import { validateRequest } from '../middleware/validateRequest';
const router = Router();

router.get('/', getRewards);
router.get('/:id', validateRequest(rewardIdParamSchema, "params"),getRewardById as RequestHandler);

export default router;
