import React from "react";
import { PROGRESSION_TIERS } from "@/lib/gamification";
import { calculateXpGain } from "@/hooks/use-progress";

export interface UserProgress {
  xp: number;
  streak: number;
  currentTier: PROGRESS_TIERS;
}

export const ProgressTracker: React.FC = () => {
  // In a real implementation, this would come from a hook or context
  const CurrentUserProgress = {
    xp: 3250,
    streak: 14,
    currentTier: "STRATEGIST",
    nextTier: "EXPERT",
    nextTierThreshold: 6000,
    level: 7,
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between">
        <span className="font-bold">XP: {progress.xp}</span>
        <span className="text-sm text-blue-600">Level {progress.level}</span>
      </div>
      <div className="mt-2">
        <div className="h-2 bg-gray-200 rounded">
          <div
            className="h-2 rounded bg-blue-600"
            style={{
              width: `${Math.min(
                100,
                (progress.xp / progress.nextTierThreshold) * 100
              )}%`,
            }}
          />
        </div>
        <div className="mt-1 text-xs text-gray-500 flex justify-between">
          <div>Streak: {progress.streak} days</div>
          <div>
            {progress.xp} / {progress.nextTierThreshold} XP
          </div>
        </div>
      </div>
    </div>
  );
};
