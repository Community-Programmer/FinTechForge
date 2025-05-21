import { Request, Response } from 'express';
import { prisma } from '../../prisma/client.js';

// Get all skill challenges
export async function getSkillChallenges(req: Request, res: Response) {
  try {
    const challenges = await prisma.skillChallenge.findMany();
    res.status(200).json({ challenges });
  } catch (error) {
    console.error('Error fetching skill challenges:', error);
    res.status(500).json({ error: 'Failed to fetch skill challenges' });
  }
}

// Get skill challenge by ID
export async function getSkillChallengeById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const challenge = await prisma.skillChallenge.findUnique({ where: { id } });
    if (!challenge) return res.status(404).json({ error: 'Skill challenge not found' });
    res.status(200).json({ challenge });
  } catch (error) {
    console.error('Error fetching skill challenge:', error);
    res.status(500).json({ error: 'Failed to fetch skill challenge' });
  }
}

// Create skill challenge
export async function createSkillChallenge(req: Request, res: Response) {
  try {
    const { title, description, difficulty, xpReward } = req.body;
    const challenge = await prisma.skillChallenge.create({ data: { title, description, difficulty, xpReward } });
    res.status(201).json({ challenge });
  } catch (error) {
    console.error('Error creating skill challenge:', error);
    res.status(500).json({ error: 'Failed to create skill challenge' });
  }
}

// Update skill challenge
export async function updateSkillChallenge(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const challenge = await prisma.skillChallenge.update({ where: { id }, data: req.body });
    res.status(200).json({ challenge });
  } catch (error) {
    console.error('Error updating skill challenge:', error);
    res.status(500).json({ error: 'Failed to update skill challenge' });
  }
}

// Delete skill challenge
export async function deleteSkillChallenge(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await prisma.skillChallenge.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting skill challenge:', error);
    res.status(500).json({ error: 'Failed to delete skill challenge' });
  }
} 