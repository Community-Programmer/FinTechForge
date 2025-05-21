import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface LearningPath {
  id: string;
  title: string;
  lessonCount: number;
  progress: number;
  icon?: React.ReactNode;
  color: string;
}

export default function LearningPathsList() {
  const [paths, setPaths] = useState<LearningPath[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/education/learning-path")
      .then(res => res.json())
      .then(data => setPaths(data.paths))
      .finally(() => setLoading(false));
  }, []);

  // Default icons for paths that don't have one
  const getDefaultIcon = (index: number) => {
    const icons = [
      // Budget icon
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
      </svg>,
      // Investment icon
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
      </svg>,
      // Education icon
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
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ];
    
    return icons[index % icons.length];
  };
  
  // Default colors for paths that don't have one
  const getDefaultColor = (index: number) => {
    const colors = ["#3B82F6", "#10B981", "#6366F1", "#EC4899", "#F59E0B"];
    return colors[index % colors.length];
  };

  if (loading) return <div>Loading learning paths...</div>;

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

      {paths.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500">No learning paths available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paths.map((path, index) => (
            <div
              key={path.id}
              className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
            >
              <div className="flex items-start p-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0 mr-4"
                  style={{ backgroundColor: path.color || getDefaultColor(index) }}
                >
                  {path.icon || getDefaultIcon(index)}
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
                        backgroundColor: path.color || getDefaultColor(index),
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="px-4 pb-4">
                <Link to={`/education/path/${path.id}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    Continue Learning
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}