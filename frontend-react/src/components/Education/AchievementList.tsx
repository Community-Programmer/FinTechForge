import React from "react";
import { AchievementBadge } from "./AchievementBadge";
import { useAchievement } from "@/hooks/use-achievement";
import Spinner from "@/components/ui/spinner";

export const AchievementsList: React.FC = () => {
  // Use the custom hook to fetch real achievements
  const { achievements, loading, error } = useAchievement();

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Spinner />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-600 mb-6">
        <h3 className="font-medium mb-1">Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  // Show empty state
  if (achievements.length === 0) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg text-gray-600 mb-6 text-center">
        <h3 className="font-medium mb-1">No achievements yet</h3>
        <p>Complete lessons and challenges to earn achievements!</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Your Achievements</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
        {achievements.map((achievement) => (
          <AchievementBadge
            key={achievement.id}
            id={achievement.id}
            title={achievement.title}
            description={achievement.description}
            unlocked={achievement.unlocked}
            color={achievement.color}
            requirement={
              !achievement.unlocked ? achievement.requirement : undefined
            }
          />
        ))}
      </div>

      {/* Display achievement progress - optional enhancement */}
      <div className="bg-gray-50 p-4 rounded-lg mt-4">
        <h4 className="font-medium mb-2">Achievement Progress</h4>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{
                width: `${
                  (achievements.filter((a) => a.unlocked).length /
                    achievements.length) *
                  100
                }%`,
              }}
            />
          </div>
          <span className="text-sm text-gray-600">
            {achievements.filter((a) => a.unlocked).length}/
            {achievements.length}
          </span>
        </div>
      </div>
    </div>
  );
};
