import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface LearningPath {
  id: string;
  title: string;
  lessonCount: number;
  progress: number;
  icon: React.ReactNode;
  color: string;
}

export const LearningPathsList: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const learningPaths: LearningPath[] = [
    {
      id: "budgeting-mastery",
      title: "Budgeting Mastery",
      lessonCount: 8,
      progress: 65,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "#3B82F6",
    },
    {
      id: "investment-basics",
      title: "Investment Basics",
      lessonCount: 12,
      progress: 30,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
      color: "#10B981",
    },
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Learning Paths</h2>
        <Link to="/education/paths">
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-800"
          >
            View All
            <svg
              className="ml-1 w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {learningPaths.map((path) => (
          <div
            key={path.id}
            className="border border-gray-200 rounded-lg overflow-hidden bg-white"
          >
            <div className="flex items-start p-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0 mr-4"
                style={{ backgroundColor: path.color }}
              >
                {path.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{path.title}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{path.lessonCount} lessons</span>
                  <span className="mx-2">•</span>
                  <span>{path.progress}% complete</span>
                </div>

                <div className="mt-2 h-1.5 w-full bg-gray-100 rounded-full">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${path.progress}%`,
                      backgroundColor: path.color,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
