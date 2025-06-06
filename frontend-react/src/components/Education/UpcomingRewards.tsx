import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

interface Reward {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const UpcomingRewards: React.FC = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);

  useEffect(() => {
    fetch("/api/v1/education/reward")
      .then(res => res.json())
      .then(data => setRewards(data.rewards));
  }, []);

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
