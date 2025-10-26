import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { UserStats } from "./use-user-stats";

// Define achievement interface
export interface Achievement {
  id: string;
  type: string;
  title: string;
  description: string;
  color?: string;
  requirement?: string;
  earnedAt: string;
}

// Define available achievements (both unlocked and locked)
export interface AvailableAchievement {
  id: string;
  type: string;
  title: string;
  description: string;
  color: string;
  requirement?: string;
  unlocked: boolean;
  earnedAt?: string;
}

// List of all possible achievements (moved outside component to avoid re-creation)
const allPossibleAchievements: Omit<
  AvailableAchievement,
  "unlocked" | "earnedAt"
>[] = [
  {
    id: "budget-master",
    type: "lesson_completion",
    title: "Budget Master",
    description: "Complete all budgeting lessons",
    color: "#3B82F6",
    requirement: "Complete all lessons in the Budgeting path",
  },
  {
    id: "investor-initiate",
    type: "quiz_completion",
    title: "Investor Initiate",
    description: "Complete your first investment quiz",
    color: "#10B981",
    requirement: "Complete an investment quiz with 80% or higher score",
  },
  {
    id: "savings-scholar",
    type: "module_completion",
    title: "Savings Scholar",
    description: "Learn all saving strategies",
    color: "#94A3B8",
    requirement: "Complete the Savings module",
  },
  {
    id: "streak-starter",
    type: "streak",
    title: "Streak Starter",
    description: "Maintain a 3-day learning streak",
    color: "#F59E0B",
    requirement: "Log in and learn for 3 consecutive days",
  },
  {
    id: "financial-advisor",
    type: "xp",
    title: "Financial Advisor",
    description: "Reach level 5 in your financial journey",
    color: "#8B5CF6",
    requirement: "Reach level 5",
  },
];

export function useAchievement() {
  const [achievements, setAchievements] = useState<AvailableAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user achievements
  const fetchAchievements = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "/api/v1/education/gamification/achievements",
        {
          withCredentials: true,
        }
      );

      const userAchievements: Achievement[] = response.data.achievements || [];

      // Merge user achievements with all possible achievements
      const mergedAchievements = allPossibleAchievements.map((achievement) => {
        const userAchievement = userAchievements.find(
          (ua) => ua.type === achievement.type || ua.id === achievement.id
        );

        return {
          ...achievement,
          unlocked: !!userAchievement,
          earnedAt: userAchievement?.earnedAt,
        };
      });

      setAchievements(mergedAchievements);
      setError(null);
    } catch (err) {
      console.error("Error fetching achievements:", err);
      setError("Failed to load achievements");
    } finally {
      setLoading(false);
    }
  }, []);

  // Unlock a new achievement
  const unlockAchievement = async (achievementType: string) => {
    try {
      const response = await axios.post(
        "/api/v1/education/gamification/achievement",
        { type: achievementType },
        { withCredentials: true }
      );

      // Refresh achievements after unlocking a new one
      fetchAchievements();

      return response.data;
    } catch (err) {
      console.error("Error unlocking achievement:", err);
      throw err;
    }
  };

  // Check if user meets achievement criteria
  const checkAchievementEligibility = async (userStats: UserStats) => {
    if (userStats.level >= 5) {
      try {
        const existingAchievement = achievements.find(
          (a) => a.id === "financial-advisor"
        );
        if (existingAchievement && !existingAchievement.unlocked) {
          await unlockAchievement("xp");
        }
      } catch (err) {
        console.error("Error checking achievement eligibility:", err);
      }
    }

    // Example: Check streak for "Streak Starter" achievement
    if (userStats.streak >= 3) {
      try {
        const existingAchievement = achievements.find(
          (a) => a.id === "streak-starter"
        );
        if (existingAchievement && !existingAchievement.unlocked) {
          await unlockAchievement("streak");
        }
      } catch (err) {
        console.error("Error checking achievement eligibility:", err);
      }
    }
  };

  // Load achievements on mount
  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  return {
    achievements,
    loading,
    error,
    fetchAchievements,
    unlockAchievement,
    checkAchievementEligibility,
  };
}
