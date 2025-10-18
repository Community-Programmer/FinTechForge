import { prisma } from '../../prisma/client';
import { Request, Response } from 'express';
import { logger } from '../utils/logger';
// Get all quizzes
export async function getQuizzes(req: Request, res: Response) {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: { questions: true },
    });
    res.status(200).json({ quizzes });
  } catch (error) {
    logger.error('Error fetching quizzes:', error);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
}

// Get quiz by ID
export async function getQuizById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const quiz = await prisma.quiz.findUnique({
      where: { id },
      include: { questions: true },
    });
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    res.status(200).json({ quiz });
  } catch (error) {
    logger.error('Error fetching quiz:', error);
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
}

// Create quiz
export async function createQuiz(req: Request, res: Response) {
  try {
    const { lessonId, title, description, xpReward, questions } = req.body;
    const quiz = await prisma.quiz.create({
      data: {
        lessonId,
        title,
        description,
        xpReward,
        questions: {
          create: questions,
        },
      },
      include: { questions: true },
    });
    res.status(201).json({ quiz });
  } catch (error) {
    logger.error('Error creating quiz:', error);
    res.status(500).json({ error: 'Failed to create quiz' });
  }
}

// Update quiz
export async function updateQuiz(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const quiz = await prisma.quiz.update({
      where: { id },
      data: req.body,
      include: { questions: true },
    });
    res.status(200).json({ quiz });
  } catch (error) {
    logger.error('Error updating quiz:', error);
    res.status(500).json({ error: 'Failed to update quiz' });
  }
}

// Delete quiz
export async function deleteQuiz(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await prisma.quiz.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    logger.error('Error deleting quiz:', error);
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
}

// Submit quiz answers
export async function submitQuiz(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { answers } = req.body; // [{questionId, answerIndex}]
    const quiz = await prisma.quiz.findUnique({
      where: { id },
      include: { questions: true },
    });
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    let score = 0;
    quiz.questions.forEach(q => {
      const userAnswer = answers.find((a: any) => a.questionId === q.id);
      if (userAnswer && userAnswer.answerIndex === q.correctAnswer) score++;
    });
    res.status(200).json({ score, total: quiz.questions.length });
  } catch (error) {
    logger.error('Error submitting quiz:', error);
    res.status(500).json({ error: 'Failed to submit quiz' });
  }
}
