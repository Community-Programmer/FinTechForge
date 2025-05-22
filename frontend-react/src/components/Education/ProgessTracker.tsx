import React, { useEffect, useState } from "react";

interface UserProgress {
  xp: number;
  streak: number;
  currentTier: string;
  nextTier: string;
  nextTierThreshold: number;
  level: number;
}
export const ProgressTracker: React.FC = () => {

  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    fetch("/api/v1/gamification/summary")
      .then(res => res.json())
      .then(data => setProgress(data));
  }, []);

  if (!progress) return <div>Loading...</div>;

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
