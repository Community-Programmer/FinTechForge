// src/hooks/use-progress-path.ts
import { useState, useEffect } from "react";
import axios from "axios";

export interface ProgressPath {
  id: string;
  name: string;
  progress: number; // percentage
  color?: string;
}

export function useProgressPath() {
  const [paths, setPaths] = useState<ProgressPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        setLoading(true);

        // First, fetch all learning paths
        const pathsResponse = await axios.get(
          "/api/v1/education/learning-path",
          {
            withCredentials: true,
          }
        );

        // Then, fetch user's education progress
        const progressResponse = await axios.get(
          "/api/v1/education/gamification/summary",
          {
            withCredentials: true,
          }
        );

        // Extract the data we need
        const learningPaths = pathsResponse.data.paths || [];
        const userProgress = progressResponse.data.progress || [];

        // Calculate progress percentage for each path
        const progressPaths = learningPaths.map((path: any) => {
          // Get all lessons for this path
          const pathLessons = path.lessons || [];

          if (pathLessons.length === 0) {
            return {
              id: path.id,
              name: path.title,
              progress: 0,
              color: path.color,
            };
          }

          // Count completed lessons for this path
          const completedLessons = pathLessons.filter((lesson: any) =>
            userProgress.some(
              (p: any) => p.lessonId === lesson.id && p.completed
            )
          ).length;

          // Calculate percentage
          const progressPercentage = Math.round(
            (completedLessons / pathLessons.length) * 100
          );

          return {
            id: path.id,
            name: path.title,
            progress: progressPercentage,
            color: path.color,
          };
        });

        setPaths(progressPaths);
        setError(null);
      } catch (err) {
        console.error("Error fetching progress paths:", err);
        setError("Failed to load progress data");
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, []);

  return { paths, loading, error };
}
