import React from "react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

export const PracticeList: React.FC = () => {
  // Mock data for practice items
  const practices = [
    {
      id: "budgeting-flashcards",
      title: "Budgeting Flashcards",
      description: "Review key budgeting concepts",
      icon: (
        <svg
          className="w-6 h-6 text-blue-600"
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
      ),
      count: 24,
      link: "/education/practice/flashcards/budgeting",
    },
    {
      id: "investment-quiz",
      title: "Investment Quiz",
      description: "Test your investment knowledge",
      icon: (
        <svg
          className="w-6 h-6 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      count: 10,
      link: "/education/practice/quiz/investment",
    },
    {
      id: "saving-strategies",
      title: "Saving Strategies",
      description: "Practice different saving methods",
      icon: (
        <svg
          className="w-6 h-6 text-purple-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
      count: 15,
      link: "/education/practice/flashcards/saving",
    },
    {
      id: "financial-terms",
      title: "Financial Terms",
      description: "Master financial vocabulary",
      icon: (
        <svg
          className="w-6 h-6 text-amber-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      ),
      count: 32,
      link: "/education/practice/flashcards/terms",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {practices.map((practice) => (
        <Link key={practice.id} to={practice.link}>
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start">
              <div className="rounded-lg p-2 bg-gray-50 mr-3">
                {practice.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{practice.title}</h3>
                <p className="text-sm text-gray-600">{practice.description}</p>
                <div className="text-sm text-gray-500 mt-2">
                  {practice.count} cards
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};
