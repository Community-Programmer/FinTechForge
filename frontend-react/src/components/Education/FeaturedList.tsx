import React from "react";
import { Button } from "@/components/ui/button";

export const FeaturedLesson: React.FC = () => {
  return (
    <div className="border border-gray-200 rounded-lg bg-white p-4 mb-6">
      <h3 className="text-lg font-medium mb-1">Featured Lesson</h3>
      <p className="text-sm text-gray-600 mb-4">
        Recommended based on your progress
      </p>

      <div className="flex items-start">
        <div className="bg-blue-500 text-white p-3 rounded-lg mr-4">
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
        </div>

        <div className="flex-1">
          <h4 className="font-medium text-lg">
            Understanding Compound Interest
          </h4>
          <p className="text-gray-600 text-sm mb-3">
            Learn how your money can grow exponentially over time
          </p>

          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span>15 min</span>
            <span className="mx-2">•</span>
            <span>Investing</span>
          </div>

          <Button className="w-full">Continue Learning</Button>
        </div>
      </div>
    </div>
  );
};
