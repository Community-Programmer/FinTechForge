import React from "react";
import { Card } from "@/components/ui/card";

export const UpcomingRewards: React.FC = () => {
  // Mock data for upcoming rewards
  const rewards = [
    {
      id: "portfolio-analyzer",
      title: "Portfolio Analyzer",
      description: "Unlock advanced portfolio analysis tools",
      icon: "📊",
    },
    {
      id: "expert-guides",
      title: "Expert Guides",
      description: "Access in-depth financial strategy guides",
      icon: "📚",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {rewards.map((reward) => (
        <Card key={reward.id} className="p-4">
          <div className="flex items-start">
            <div className="text-2xl mr-3">{reward.icon}</div>
            <div>
              <h4 className="font-medium">{reward.title}</h4>
              <p className="text-sm text-gray-600">{reward.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
