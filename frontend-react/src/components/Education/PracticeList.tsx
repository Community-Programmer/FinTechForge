import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../ui/spinner";

// Define interfaces based on your Prisma schema
interface Flashcard {
  id: string;
  front: string;
  back: string;
}

interface FlashcardDeck {
  id: string;
  title: string;
  description: string;
  lessonId?: string;
  flashcards: Flashcard[];
}

export const PracticeList: React.FC = () => {
  const [flashcardDecks, setFlashcardDecks] = useState<FlashcardDeck[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlashcardDecks = async () => {
      try {
        setLoading(true);

        const response = await axios.get("/api/v1/education/flashcard", {
          withCredentials: true,
        });
        setFlashcardDecks(response.data.flashcardDecks || []);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch flashcard decks:", err);
        setError("Failed to load practice materials");
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcardDecks();
  }, []);

  // Map of icons for different categories
  const getIconForDeck = (index: number) => {
    const icons = [
      // Budgeting icon
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
      </svg>,
      // Investment icon
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
      </svg>,
      // Saving strategies icon
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
      </svg>,
      // Financial terms icon
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
      </svg>,
    ];

    return icons[index % icons.length];
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Spinner />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-600 mb-6">
        <h3 className="font-medium mb-1">Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  // Show empty state
  if (flashcardDecks.length === 0) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg text-gray-600 mb-6 text-center">
        <h3 className="font-medium mb-1">No practice materials available</h3>
        <p>Check back later for new flashcard decks and quizzes.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {flashcardDecks.map((deck, index) => (
        <Link key={deck.id} to={`/education/practice/flashcards/${deck.id}`}>
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start">
              <div className="rounded-lg p-2 bg-gray-50 mr-3">
                {getIconForDeck(index)}
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{deck.title}</h3>
                <p className="text-sm text-gray-600">{deck.description}</p>
                <div className="text-sm text-gray-500 mt-2">
                  {deck.flashcards.length} cards
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};
