import React from "react";
import { AchievementBadge } from "./AchievementBadge";

export const AchievementsList: React.FC = () => {
  // Mock achievements data
  const achievements = [
    {
      id: "budget-master",
      title: "Budget Master",
      description: "Complete all budgeting lessons",
      color: "#3B82F6",
      unlocked: true,
    },
    {
      id: "investor-initiate",
      title: "Investor Initiate",
      description: "Make your first investment quiz",
      color: "#10B981",
      unlocked: true,
    },
    {
      id: "savings-scholar",
      title: "Savings Scholar",
      description: "Learn all saving strategies",
      color: "#94A3B8",
      unlocked: false,
      requirement: "Learn all saving strategies",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {achievements.map((achievement) => (
        <AchievementBadge
          key={achievement.id}
          id={achievement.id}
          title={achievement.title}
          description={achievement.description}
          unlocked={achievement.unlocked}
          color={achievement.color}
          requirement={achievement.requirement}
        />
      ))}
    </div>
  );
};
