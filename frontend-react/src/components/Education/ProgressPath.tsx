import React from "react";

export const ProgressPath: React.FC = () => {
  // Mock data for progress paths
  const paths = [
    { id: "budgeting", name: "Budgeting", progress: 65 },
    { id: "investing", name: "Investing", progress: 30 },
    { id: "saving", name: "Saving", progress: 85 },
    { id: "credit", name: "Credit", progress: 15 },
  ];

  return (
    <div className="border border-gray-200 bg-white rounded-lg p-4 mb-6">
      <div className="space-y-4">
        {paths.map((path) => (
          <div key={path.id} className="flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">{path.name}</span>
              <span className="text-sm text-gray-500">{path.progress}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${path.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
