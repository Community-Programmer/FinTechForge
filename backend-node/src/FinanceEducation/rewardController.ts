import { prisma } from '../../prisma/client.js';
import { Request, Response } from 'express';

// Get all rewards
export async function getRewards(req: Request, res: Response) {
  try {
    const rewards = await prisma.reward.findMany();
    res.status(200).json({ rewards });
  } catch (error) {
    console.error('Error fetching rewards:', error);
    res.status(500).json({ error: 'Failed to fetch rewards' });
  }
}

// Get reward by ID
export async function getRewardById(req: Request, res: Response){
  try {
    const { id } = req.params;
    const reward = await prisma.reward.findUnique({ where: { id } });
    if (!reward) return res.status(404).json({ error: 'Reward not found' });
    res.status(200).json({ reward });
  } catch (error) {
    console.error('Error fetching reward:', error);
    res.status(500).json({ error: 'Failed to fetch reward' });
  }
} 