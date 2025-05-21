import { prisma } from '../../prisma/client.js';
import { Request, Response } from 'express';

// Get all flashcard decks
export async function getFlashcardDecks(req: Request, res: Response) {
  try {
    const decks = await prisma.flashcardDeck.findMany({ include: { flashcards: true } });
    res.status(200).json({ decks });
  } catch (error) {
    console.error('Error fetching flashcard decks:', error);
    res.status(500).json({ error: 'Failed to fetch flashcard decks' });
  }
}

// Get flashcard deck by ID
export async function getFlashcardDeckById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deck = await prisma.flashcardDeck.findUnique({ where: { id }, include: { flashcards: true } });
    if (!deck) return res.status(404).json({ error: 'Flashcard deck not found' });
    res.status(200).json({ deck });
  } catch (error) {
    console.error('Error fetching flashcard deck:', error);
    res.status(500).json({ error: 'Failed to fetch flashcard deck' });
  }
}

// Create flashcard deck
export async function createFlashcardDeck(req: Request, res: Response) {
  try {
    const { lessonId, title, description, flashcards } = req.body;
    const deck = await prisma.flashcardDeck.create({
      data: {
        lessonId,
        title,
        description,
        flashcards: {
          create: flashcards,
        },
      },
      include: { flashcards: true },
    });
    res.status(201).json({ deck });
  } catch (error) {
    console.error('Error creating flashcard deck:', error);
    res.status(500).json({ error: 'Failed to create flashcard deck' });
  }
}

// Update flashcard deck
export async function updateFlashcardDeck(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deck = await prisma.flashcardDeck.update({
      where: { id },
      data: req.body,
      include: { flashcards: true },
    });
    res.status(200).json({ deck });
  } catch (error) {
    console.error('Error updating flashcard deck:', error);
    res.status(500).json({ error: 'Failed to update flashcard deck' });
  }
}

// Delete flashcard deck
export async function deleteFlashcardDeck(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await prisma.flashcardDeck.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting flashcard deck:', error);
    res.status(500).json({ error: 'Failed to delete flashcard deck' });
  }
} 