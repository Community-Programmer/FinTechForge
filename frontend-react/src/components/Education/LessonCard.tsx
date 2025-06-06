import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface LessonCardProps {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  xpReward: number;
  progress: number; // 0-100
  category: string;
  icon?: React.ReactNode;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  id,
  title,
  description,
  duration,
  xpReward,
  progress,
  category,
  icon,
}) => {
  const navigate = useNavigate();

  const handleStartLesson = () => {
    navigate(`/education/lesson/${id}`);
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
      <div className="flex gap-4">
        <div className="h-12 w-12 flex-shrink-0 rounded-lg bg-blue-500 flex items-center justify-center text-white">
          {icon || (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">{title}</h3>
            <span className="text-sm text-gray-500">{duration} min</span>
          </div>
          <p className="text-sm text-gray-600 mt-1 mb-3">{description}</p>

          {/* Progress bar */}
          {progress > 0 && (
            <div className="h-1.5 w-full bg-gray-100 rounded-full mb-3">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
              {category}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-amber-500 font-medium">
                +{xpReward} XP
              </span>
              <Button
                variant={progress > 0 ? "outline" : "default"}
                size="sm"
                onClick={handleStartLesson}
              >
                {progress > 0 ? "Continue" : "Start"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main component to list all lessons
export default function LessonsList() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/education/lesson")
      .then(res => res.json())
      .then(data => setLessons(data.lessons))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Available Lessons</h2>
      {lessons.length === 0 ? (
        <p>No lessons available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lessons.map((lesson: LessonCardProps) => (
            <LessonCard
              key={lesson.id}
              id={lesson.id}
              title={lesson.title}
              description={lesson.description}
              duration={lesson.duration}
              xpReward={lesson.xpReward}
              progress={lesson.progress}
              category={lesson.category}
            />
          ))}
        </div>
      )}
    </div>
  );
}