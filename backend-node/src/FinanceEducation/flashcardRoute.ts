import { RequestHandler, Router } from 'express';
import { getFlashcardDeckById,
  getFlashcardDecks,
  createFlashcardDeck,
  updateFlashcardDeck,
  deleteFlashcardDeck
 } from './flashcardController';
import {
  flashcardDeckIdParamSchema,
  createFlashcardDeckSchema,
  updateFlashcardDeckSchema
} from '../validator/flashCardValidator';
import { validateRequest } from '../middleware/validateRequest';
const router = Router();

router.get('/', getFlashcardDecks);
router.get('/:id',validateRequest(flashcardDeckIdParamSchema,"params"), getFlashcardDeckById as RequestHandler);
router.post('/', validateRequest(createFlashcardDeckSchema), createFlashcardDeck);
router.patch('/:id',validateRequest(flashcardDeckIdParamSchema, "params"),
  validateRequest(updateFlashcardDeckSchema as any), updateFlashcardDeck);
router.delete('/:id',validateRequest(flashcardDeckIdParamSchema,"params"), deleteFlashcardDeck);

export default router; 