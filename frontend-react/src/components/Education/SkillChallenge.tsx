import React from "react";
import { Button } from "@/components/ui/button";

interface SkillChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  xpReward: number;
}

export const SkillChallenges: React.FC = () => {
  // Mock data for skill challenges
  const challenges: SkillChallenge[] = [
    {
      id: "budget-builder",
      title: "Budget Builder Challenge",
      description: "Create a balanced budget from a scenario",
      difficulty: "Medium",
      xpReward: 250,
    },
    {
      id: "interest-calculator",
      title: "Interest Rate Calculator",
      description: "Calculate interest payments accurately",
      difficulty: "Hard",
      xpReward: 350,
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-blue-100 text-blue-800";
      case "Hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Skill Challenges</h2>
      <div className="space-y-4">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className="border border-gray-200 rounded-lg p-4 bg-white"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{challenge.title}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {challenge.description}
                </p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-md ${getDifficultyColor(
                  challenge.difficulty
                )}`}
              >
                {challenge.difficulty}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-amber-500">
                <svg
                  className="w-5 h-5 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L15 8L21 9L16.5 14L17 20L12 17.5L7 20L7.5 14L3 9L9 8L12 2Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="font-medium">{challenge.xpReward} XP</span>
              </div>
              <Button size="sm">Take Challenge</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
