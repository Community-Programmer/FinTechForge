import { prisma } from '../../prisma/client.js';
import { Request, Response } from 'express';
// Get all lessons
export async function getLessons(req: Request, res: Response) {
  try {
    const lessons = await prisma.lesson.findMany({
      include: { quizzes: true, flashcardDecks: true }
    });
    res.status(200).json({ lessons });
  } catch (error) {
    console.error('Error fetching lessons:', error);
    res.status(500).json({ error: 'Failed to fetch lessons' });
  }
}

// Get lesson by ID
export async function getLessonById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: { quizzes: true, flashcardDecks: true }
    });
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
    res.status(200).json({ lesson });
  } catch (error) {
    console.error('Error fetching lesson:', error);
    res.status(500).json({ error: 'Failed to fetch lesson' });
  }
}

// Create lesson
export async function createLesson(req: Request, res: Response) {
  try {
    const { title, description, duration, xpReward, category, icon, learningPathId } = req.body;
    const lesson = await prisma.lesson.create({
      data: { title, description, duration, xpReward, category, icon, learningPathId },
    });
    res.status(201).json({ lesson });
  } catch (error) {
    console.error('Error creating lesson:', error);
    res.status(500).json({ error: 'Failed to create lesson' });
  }
}

// Update lesson
export async function updateLesson(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const lesson = await prisma.lesson.update({
      where: { id },
      data: req.body,
    });
    res.status(200).json({ lesson });
  } catch (error) {
    console.error('Error updating lesson:', error);
    res.status(500).json({ error: 'Failed to update lesson' });
  }
}

// Delete lesson
export async function deleteLesson(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await prisma.lesson.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting lesson:', error);
    res.status(500).json({ error: 'Failed to delete lesson' });
  }
} 