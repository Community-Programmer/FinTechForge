import { prisma } from '../../prisma/client';
import { Request, Response } from 'express';
// Get all learning paths
export async function getLearningPaths(req: Request, res: Response) {
  try {
    const paths = await prisma.learningPath.findMany({
      include: { lessons: true },
    });
    res.status(200).json({ paths });
  } catch (error) {
    console.error('Error fetching learning paths:', error);
    res.status(500).json({ error: 'Failed to fetch learning paths' });
  }
}

// Get learning path by ID
export async function getLearningPathById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const path = await prisma.learningPath.findUnique({
      where: { id },
      include: { lessons: true },
    });
    if (!path)
      return res.status(404).json({ error: 'Learning path not found' });
    res.status(200).json({ path });
  } catch (error) {
    console.error('Error fetching learning path:', error);
    res.status(500).json({ error: 'Failed to fetch learning path' });
  }
}

// Create learning path
export async function createLearningPath(req: Request, res: Response) {
  try {
    const { title, color, icon } = req.body;
    const path = await prisma.learningPath.create({
      data: { title, color, icon },
    });
    res.status(201).json({ path });
  } catch (error) {
    console.error('Error creating learning path:', error);
    res.status(500).json({ error: 'Failed to create learning path' });
  }
}

// Update learning path
export async function updateLearningPath(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const path = await prisma.learningPath.update({
      where: { id },
      data: req.body,
    });
    res.status(200).json({ path });
  } catch (error) {
    console.error('Error updating learning path:', error);
    res.status(500).json({ error: 'Failed to update learning path' });
  }
}

// Delete learning path
export async function deleteLearningPath(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await prisma.learningPath.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting learning path:', error);
    res.status(500).json({ error: 'Failed to delete learning path' });
  }
}
