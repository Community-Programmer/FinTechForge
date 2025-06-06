import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';

// GET: Retrieve user stats
export async function getUserStats(
  req: Request & { user: { id: string } },
  res: Response
) {
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
      return res.status(404).json({ error: 'User not found' });
    }

    // Calculate derived stats
    const completedLessons = user.educationProgress.filter(
      p => p.completed
    ).length;
    const totalXp = user.xp || 0;

    // Calculate XP required for next level (simple formula - can be adjusted)
    const xpRequired = (user.level || 1) * 1000;

    // Determine rank based on level or other metrics
    const currentRank = determineRank(user.level || 1);

    const stats = {
      level: user.level || 1,
      xp: totalXp,
      xpRequired: xpRequired,
      streak: user.dailyStreak || 0,
      lessons: completedLessons,
      achievements: user.achievements.length,
      currentRank: user.currentRank || currentRank,
      lastActiveDate: user.lastActiveDate,
    };

    res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ error: 'Failed to fetch user stats' });
  }
}

// PUT: Update user stats
export async function updateUserStats(
  req: Request & { user: { id: string } },
  res: Response
) {
  try {
    const userId = req.user.id;
    const { xp, level, dailyStreak, currentRank } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        xp: xp !== undefined ? xp : undefined,
        level: level !== undefined ? level : undefined,
        dailyStreak: dailyStreak !== undefined ? dailyStreak : undefined,
        currentRank: currentRank !== undefined ? currentRank : undefined,
        lastActiveDate: new Date(),
      },
    });

    res.status(200).json({
      message: 'User stats updated successfully',
      user: {
        id: updatedUser.id,
        level: updatedUser.level,
        xp: updatedUser.xp,
        dailyStreak: updatedUser.dailyStreak,
        currentRank: updatedUser.currentRank,
      },
    });
  } catch (error) {
    console.error('Error updating user stats:', error);
    res.status(500).json({ error: 'Failed to update user stats' });
  }
}

// POST: Add XP and check for level up
export async function addXpAndCheckLevelUp(
  req: Request & { user: { id: string } },
  res: Response
) {
  try {
    const userId = req.user.id;
    const { xpAmount } = req.body;

    if (!xpAmount || xpAmount <= 0) {
      return res.status(400).json({ error: 'Invalid XP amount' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Calculate new XP and level
    const currentXp = user.xp || 0;
    const currentLevel = user.level || 1;

    const newXp = currentXp + xpAmount;
    let newLevel = currentLevel;
    let leveled = false;

    // Simple level up logic
    const xpNeeded = currentLevel * 1000;
    if (newXp >= xpNeeded) {
      newLevel += 1;
      leveled = true;
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        xp: newXp,
        level: newLevel,
        lastActiveDate: new Date(),
      },
    });

    // Response includes level up info
    res.status(200).json({
      updatedUser,
      message: 'XP added successfully',
      xpAdded: xpAmount,
      newXp: newXp,
      newLevel: newLevel,
      leveledUp: leveled,
    });
  } catch (error) {
    console.error('Error adding XP:', error);
    res.status(500).json({ error: 'Failed to add XP' });
  }
}

// GET: Reset daily streak if user hasn't been active
export async function checkAndUpdateStreak(
  req: Request & { user: { id: string } },
  res: Response
) {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const lastActive = user.lastActiveDate;
    const currentTime = new Date();
    let updatedStreak = user.dailyStreak || 0;
    let streakReset = false;

    // Check if lastActive exists and is more than 24 hours ago
    if (lastActive) {
      const hoursSinceActive =
        (currentTime.getTime() - lastActive.getTime()) / (1000 * 60 * 60);

      if (hoursSinceActive > 48) {
        // More than 48 hours - reset streak
        updatedStreak = 0;
        streakReset = true;
      } else if (hoursSinceActive > 24) {
        // Between 24-48 hours - can maintain streak with activity
        // Keep streak, but needs to be updated
      } else {
        // Less than 24 hours - already active today
      }
    }

    // Update lastActiveDate
    await prisma.user.update({
      where: { id: userId },
      data: {
        lastActiveDate: currentTime,
        dailyStreak: updatedStreak,
      },
    });

    res.status(200).json({
      currentStreak: updatedStreak,
      streakReset,
      lastActive: currentTime,
    });
  } catch (error) {
    console.error('Error checking streak:', error);
    res.status(500).json({ error: 'Failed to check streak' });
  }
}

// Helper function to determine rank based on level
function determineRank(level: number): string {
  if (level >= 10) return 'Finance Guru';
  if (level >= 7) return 'Budget Master';
  if (level >= 5) return 'Money Manager';
  if (level >= 3) return 'Financial Student';
  return 'Finance Novice';
}

// Keep the existing function
export async function getFlashcardDecks(
  req: Request & { user: { id: string } },
  res: Response
) {
  try {
    const id = req.user.id;
    const decks = await prisma.user.findFirst({
      where: {
        id,
      },
    });
    res.status(200).json({ decks });
  } catch (error) {
    console.error('Error fetching flashcard decks:', error);
    res.status(500).json({ error: 'Failed to fetch flashcard decks' });
  }
}
