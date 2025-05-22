import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';

// Define progression tier type
interface ProgressionTier {
  key:
    | 'GURU'
    | 'EXPERT'
    | 'STRATEGIST'
    | 'INVESTOR'
    | 'PLANNER'
    | 'SAVER'
    | 'NOVICE';
  threshold: number;
}

// Utility: Calculate tier based on XP
const progressionTiers: ProgressionTier[] = [
  { key: 'GURU', threshold: 8500 },
  { key: 'EXPERT', threshold: 6000 },
  { key: 'STRATEGIST', threshold: 4000 },
  { key: 'INVESTOR', threshold: 2500 },
  { key: 'PLANNER', threshold: 1200 },
  { key: 'SAVER', threshold: 500 },
  { key: 'NOVICE', threshold: 0 },
];

function getTier(xp: number): ProgressionTier['key'] {
  for (const tier of progressionTiers) {
    if (xp >= tier.threshold) return tier.key;
  }
  return 'NOVICE';
}

// GET user gamification summary
export const getGamificationSummary = async (
  req: Request & { user: { id: string } }, // Inline type definition
  res: Response
): Promise<void> => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        educationProgress: true,
        achievements: true,
        skillTrees: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const xp = user.educationProgress.reduce(
      (sum, p) => sum + (p.xpEarned || 0),
      0
    );
    const tier = getTier(xp);

    res.status(200).json({
      xp,
      tier,
      streak: user.dailyStreak || 0,
      achievements: user.achievements,
      skillTrees: user.skillTrees,
      progress: user.educationProgress,
    });
  } catch (error) {
    console.error('Error getting gamification summary:', error);
    res.status(500).json({ error: 'Failed to retrieve gamification data' });
  }
};

// POST: Add XP for a completed lesson/quiz
export async function completeModule(
  req: Request & { user: { id: string } }, // Inline type definition
  res: Response
): Promise<void> {
  try {
    const userId = req.user.id;
    const { lessonId, xpEarned } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Use a transaction to ensure data consistency
    const result = await prisma.$transaction(async tx => {
      const progress = await tx.educationProgress.upsert({
        where: {
          userId_lessonId: {
            userId,
            lessonId,
          },
        },
        update: {
          completed: true,
          xpEarned,
          completedAt: new Date(),
        },
        create: {
          userId,
          lessonId,
          completed: true,
          xpEarned,
          completedAt: new Date(),
        },
      });

      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          lastActiveDate: new Date(),
          dailyStreak: {
            increment: 1,
          },
        },
      });

      return {
        progress,
        streak: updatedUser.dailyStreak,
      };
    });

    res.status(200).json({
      success: true,
      progress: result.progress,
      streak: result.streak,
      message: 'Module completed successfully',
    });
  } catch (error) {
    console.error('Error completing module:', error);
    res.status(500).json({ error: 'Failed to complete module' });
  }
}

// POST: Add an achievement
export const addAchievement = async (
  req: Request & { user: { id: string } }, // Inline type definition
  res: Response
): Promise<void> => {
  try {
    const userId = req.user.id;
    const { type, title, description, color, requirement } = req.body;

    const existingAchievement = await prisma.achievement.findFirst({
      where: {
        userId,
        type,
      },
    });

    if (existingAchievement) {
      res.status(200).json({
        success: true,
        achievement: existingAchievement,
        message: 'Achievement already earned',
      });
      return;
    }

    const achievement = await prisma.achievement.create({
      data: {
        userId,
        type,
        title,
        description,
        color,
        requirement,
      },
    });

    res.status(201).json({ success: true, achievement });
  } catch (error) {
    console.error('Error adding achievement:', error);
    res.status(500).json({ error: 'Failed to add achievement' });
  }
};

// GET: All achievements for user
export const getAchievements = async (
  req: Request & { user: { id: string } }, // Inline type definition
  res: Response
): Promise<void> => {
  try {
    const userId = req.user.id;

    const achievements = await prisma.achievement.findMany({
      where: { userId },
    });

    res.status(200).json({ achievements });
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({ error: 'Failed to fetch achievements' });
  }
};

// GET: User skill tree progress
export const getSkillTrees = async (
  req: Request & { user: { id: string } }, // Inline type definition
  res: Response
): Promise<void> => {
  try {
    const userId = req.user.id;

    const skillTrees = await prisma.userSkillTree.findMany({
      where: { userId },
    });

    res.status(200).json({ skillTrees });
  } catch (error) {
    console.error('Error fetching skill trees:', error);
    res.status(500).json({ error: 'Failed to fetch skill trees' });
  }
};

// POST: Update skill tree progress
export const updateSkillTree = async (
  req: Request & { user: { id: string } }, // Inline type definition
  res: Response
): Promise<void> => {
  try {
    const userId = req.user.id;
    const { skillTreeId, progress } = req.body;

    const updated = await prisma.userSkillTree.upsert({
      where: {
        userId_skillTreeId: {
          userId,
          skillTreeId,
        },
      },
      update: { progress },
      create: {
        userId,
        skillTreeId,
        progress,
      },
    });

    res.status(200).json({ success: true, updated });
  } catch (error) {
    console.error('Error updating skill tree:', error);
    res.status(500).json({ error: 'Failed to update skill tree' });
  }
};
