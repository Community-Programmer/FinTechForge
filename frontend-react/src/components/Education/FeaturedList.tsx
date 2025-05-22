import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useUserStats } from "@/hooks/use-user-stats";

// Define lesson interface based on your Prisma schema
interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number;
  xpReward: number;
  category: string;
  icon?: string;
  learningPathId?: string;
}

export const FeaturedLesson: React.FC = () => {
  const [featuredLesson, setFeaturedLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get addXp function from the useUserStats hook
  const { addXp } = useUserStats();

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true);

        // Fetch lessons from your API
        const response = await axios.get("/api/v1/education/lesson", {
          withCredentials: true,
        });

        // Get lessons from response
        const lessons = response.data.lessons;

        if (!lessons || lessons.length === 0) {
          setError("No lessons available");
          return;
        }

        // Select a featured lesson (for now, just pick the first one)
        // In a real app, you could use an algorithm to select the most relevant one
        setFeaturedLesson(lessons[0]);
      } catch (err) {
        console.error("Failed to fetch lessons:", err);
        setError("Failed to load lessons");
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  // Handle clicking "Continue Learning" button
  const handleContinueLearning = async () => {
    if (!featuredLesson) return;

    try {
      // Navigate to lesson page (you'll need to implement this)
      window.location.href = `/education/lesson/${featuredLesson.id}`;

      // Award XP when starting the lesson (optional)
      // await addXp(10); // Give a small amount of XP for starting a lesson
    } catch (err) {
      console.error("Error starting lesson:", err);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="border border-gray-200 rounded-lg bg-white p-4 mb-6">
        <h3 className="text-lg font-medium mb-1">Featured Lesson</h3>
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !featuredLesson) {
    return (
      <div className="border border-gray-200 rounded-lg bg-white p-4 mb-6">
        <h3 className="text-lg font-medium mb-1">Featured Lesson</h3>
        <div className="p-4 text-center text-gray-500">
          {error || "No lessons available"}
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg bg-white p-4 mb-6">
      <h3 className="text-lg font-medium mb-1">Featured Lesson</h3>
      <p className="text-sm text-gray-600 mb-4">
        Recommended based on your progress
      </p>

      <div className="flex items-start">
        <div className="bg-blue-500 text-white p-3 rounded-lg mr-4">
          {featuredLesson.icon ? (
            <img
              src={featuredLesson.icon}
              alt={featuredLesson.title}
              className="w-6 h-6"
            />
          ) : (
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
          )}
        </div>

        <div className="flex-1">
          <h4 className="font-medium text-lg">{featuredLesson.title}</h4>
          <p className="text-gray-600 text-sm mb-3">
            {featuredLesson.description}
          </p>

          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span>{featuredLesson.duration} min</span>
            <span className="mx-2">•</span>
            <span>{featuredLesson.category}</span>
            <span className="mx-2">•</span>
            <span>{featuredLesson.xpReward} XP</span>
          </div>

          <Button className="w-full" onClick={handleContinueLearning}>
            Continue Learning
          </Button>
        </div>
      </div>
    </div>
  );
};
