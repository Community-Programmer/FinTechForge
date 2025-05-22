import { RequestHandler, Router } from 'express';
import { getFlashcardDeckById,
  getFlashcardDecks,
  createFlashcardDeck,
  updateFlashcardDeck,
  deleteFlashcardDeck
 } from './flashcardController';

const router = Router();

router.get('/', getFlashcardDecks);
router.get('/:id', getFlashcardDeckById as RequestHandler);
router.post('/', createFlashcardDeck);
router.patch('/:id', updateFlashcardDeck);
router.delete('/:id', deleteFlashcardDeck);

export default router; 