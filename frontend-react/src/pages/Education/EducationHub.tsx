import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UpcomingRewards } from "@/components/Education/UpcomingRewards";
import { ProgressPath } from "@/components/Education/ProgressPath";
import { AchievementsList } from "@/components/Education/AchievementList";
import SkillChallenges from "@/components/Education/SkillChallenge";
import { PracticeList } from "@/components/Education/PracticeList";
import { FeaturedLesson } from "@/components/Education/FeaturedList";
import LearningPathsList from "@/components/Education/LearningPathList";
import Navbar from "@/components/Navbar/Navbar";
import { useUserStats } from "@/hooks/use-user-stats"; // Import the custom hook
import { useAchievement } from "@/hooks/use-achievement";
import Spinner from "@/components/ui/spinner"; // Create or import a spinner component

const EducationHub: React.FC = () => {
  const [currentTab, setCurrentTab] = useState("learn");

  // Replace static data with API data
  const { userStats, loading, error } = useUserStats();
  const { checkAchievementEligibility } = useAchievement();

  // Check for new achievements whenever userStats changes
  useEffect(() => {
    if (userStats) {
      checkAchievementEligibility(userStats);
    }
  }, [userStats, checkAchievementEligibility]);

  // Show loading state while fetching data
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="large" />
      </div>
    );
  }

  // Show error message if data fetch failed
  if (error || !userStats) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-center p-4">
          <h3 className="text-xl font-bold">Something went wrong</h3>
          <p>{error || "Unable to load user data"}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-1">
      {/* Header Section */}
      <Navbar />
      <div className="bg-blue-600 text-white p-6 rounded-2xl mb-6 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-bold">Financial Education Hub</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="rounded-full bg-white/20 p-1">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L15 8L21 9L16.5 14L17 20L12 17.5L7 20L7.5 14L3 9L9 8L12 2Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span>{userStats.level}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="rounded-full bg-white/20 p-1">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span>{userStats.streak} day streak</span>
            </div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="mb-4">
          <div className="text-sm">Level {userStats.level}</div>
          <div className="w-full h-2 bg-blue-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full"
              style={{
                width: `${(userStats.xp / userStats.xpRequired) * 100}%`,
              }}
            />
          </div>
          <div className="text-sm text-right">
            {userStats.xp} / {userStats.xpRequired} XP
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-500 p-4 rounded-lg flex flex-col items-center">
            <svg
              className="w-6 h-6 mb-1"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20v-2H6.5a2.5 2.5 0 0 0 0 5H20v-2H6.5A2.5 2.5 0 0 1 4 19.5zM20 7H6.5a2.5 2.5 0 0 1 0-5H20v2H6.5A2.5 2.5 0 0 0 4 6.5 2.5 2.5 0 0 0 6.5 9H20V7z"
                fill="currentColor"
              />
            </svg>
            <div className="text-xl font-bold">{userStats.lessons}</div>
            <div className="text-sm md:text-md lg:text-lg">Lessons</div>
          </div>
          <div className="bg-blue-500 p-4 rounded-lg flex flex-col items-center">
            <svg
              className="w-6 h-6 mb-1"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L15 8L21 9L16.5 14L17 20L12 17.5L7 20L7.5 14L3 9L9 8L12 2Z"
                fill="currentColor"
              />
            </svg>
            <div className="text-xl font-bold">{userStats.achievements}</div>
            <div className="text-sm md:text-md lg:text-lg">Achievements</div>
          </div>
          <div className="bg-blue-500 p-4 rounded-lg flex flex-col items-center">
            <svg
              className="w-6 h-6 mb-1"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2z"
                fill="currentColor"
              />
            </svg>
            <div className="text-xl font-bold">{userStats.currentRank}</div>
            <div className="text-sm md:text-md lg:text-lg">Current Rank</div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs
        defaultValue="learn"
        className="w-full"
        onValueChange={setCurrentTab}
      >
        <TabsList className="grid grid-cols-3 mb-4 bg-gray-100 rounded-lg">
          <TabsTrigger value="learn" className="rounded-lg">
            Learn
          </TabsTrigger>
          <TabsTrigger value="practice" className="rounded-lg">
            Practice
          </TabsTrigger>
          <TabsTrigger value="achievements" className="rounded-lg">
            Achievements
          </TabsTrigger>
        </TabsList>

        {/* Learn Tab Content */}
        <TabsContent value="learn" className="space-y-6 px-10 mb-10">
          {/* <DailyChallenge /> */}
          <LearningPathsList />
          <FeaturedLesson />
        </TabsContent>

        {/* Practice Tab Content */}
        <TabsContent value="practice" className="space-y-6 px-10 mb-10">
          <h2 className="text-xl font-bold mb-4">Practice Your Knowledge</h2>
          <PracticeList />
          <SkillChallenges />
        </TabsContent>

        {/* Achievements Tab Content */}
        <TabsContent value="achievements" className="space-y-6 px-10 mb-10">
          <h2 className="text-xl font-bold mb-4">Your Achievements</h2>
          <AchievementsList />
          <h2 className="text-xl font-bold mb-4">Progress Path</h2>
          <ProgressPath />
          <h2 className="text-xl font-bold mb-4">Upcoming Rewards</h2>
          <UpcomingRewards />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EducationHub;
