import { useState, useEffect } from "react";
import axios from "axios";

// Define the types for our user stats
export interface UserStats {
  level: number;
  xp: number;
  xpRequired: number;
  streak: number;
  lessons: number;
  achievements: number;
  currentRank: string;
  lastActiveDate?: string;
}

export const useUserStats = () => {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/v1/education/stats", {
        withCredentials: true,
      });
      setUserStats(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching user stats:", err);
      setError("Failed to load user stats");
    } finally {
      setLoading(false);
    }
  };

  // Function to update streak (call this on app load)
  const checkAndUpdateStreak = async () => {
    try {
      await axios.get("/api/v1/education/stats/check-streak", {
        withCredentials: true,
      });
      // Refresh user stats after updating streak
      fetchUserStats();
    } catch (err) {
      console.error("Error updating streak:", err);
    }
  };

  // Function to add XP
  const addXp = async (xpAmount: number) => {
    try {
      const response = await axios.post(
        "/api/v1/education/stats/add-xp",
        { xpAmount },
        { withCredentials: true }
      );

      // Refresh user stats
      fetchUserStats();
      return response.data;
    } catch (err) {
      console.error("Error adding XP:", err);
      throw err;
    }
  };

  // Fetch stats on component mount
  useEffect(() => {
    fetchUserStats();
    // Optionally check and update streak on app load
    checkAndUpdateStreak();
  }, []);

  return {
    userStats,
    loading,
    error,
    fetchUserStats,
    addXp,
    checkAndUpdateStreak,
  };
};
