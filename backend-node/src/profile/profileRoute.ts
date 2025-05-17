import { Router } from 'express';
import { getProfile, updateProfile } from './profileController';
import authMiddleware from './authMiddleware';

const router = Router();

router.get('/', authMiddleware, getProfile);
router.put('/', authMiddleware, updateProfile);

export default router;