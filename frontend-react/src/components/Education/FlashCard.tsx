import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../ui/spinner";

// Use the same interfaces as PracticeList.tsx
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

interface FlashcardDeckProps {
  cards: Flashcard[];
  title: string;
  description: string;
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({
  cards,
  title,
  description,
}) => {
  // Existing component code remains the same
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [animation, setAnimation] = useState<"swipeLeft" | "swipeRight" | null>(
    null
  );
  const touchStartX = useRef<number | null>(null);

  // All other methods remain the same
  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setAnimation("swipeLeft");
      setTimeout(() => {
        setCurrentCardIndex(currentCardIndex + 1);
        setIsFlipped(false);
        setAnimation(null);
      }, 300);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setAnimation("swipeRight");
      setTimeout(() => {
        setCurrentCardIndex(currentCardIndex - 1);
        setIsFlipped(false);
        setAnimation(null);
      }, 300);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      handleNextCard();
    } else if (diff < -50) {
      handlePrevCard();
    }

    touchStartX.current = null;
  };

  const currentCard = cards[currentCardIndex];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <div className="text-sm text-gray-500">
          Card {currentCardIndex + 1} of {cards.length}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 w-full bg-gray-100 rounded-full mb-4">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${((currentCardIndex + 1) / cards.length) * 100}%` }}
        />
      </div>

      {/* Flashcard */}
      <div
        className="mb-4 perspective relative"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Card
          className={`p-8 min-h-[200px] flex items-center justify-center cursor-pointer transition-all duration-300 transform-style preserve-3d ${
            isFlipped ? "rotate-y-180" : ""
          } ${
            animation === "swipeLeft"
              ? "animate-swipe-left"
              : animation === "swipeRight"
              ? "animate-swipe-right"
              : ""
          }`}
          onClick={handleCardFlip}
        >
          <div
            className={`absolute backface-hidden ${
              isFlipped ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="text-center">
              <div className="text-xl font-medium">{currentCard.front}</div>
              <div className="mt-4 text-sm text-gray-500">(Tap to flip)</div>
            </div>
          </div>
          <div
            className={`absolute backface-hidden rotate-y-180 ${
              isFlipped ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="text-center">
              <div className="text-xl">{currentCard.back}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevCard}
          disabled={currentCardIndex === 0}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNextCard}
          disabled={currentCardIndex === cards.length - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

// Update FlashcardDeckPage to use useParams and axios
const FlashcardDeckPage: React.FC = () => {
  // Get deckId from URL params
  const { deckId } = useParams<{ deckId: string }>();
  const [deck, setDeck] = useState<FlashcardDeck | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/v1/education/flashcard/${deckId}`,
          {
            withCredentials: true,
          }
        );
        setDeck(response.data.flashcardDeck);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch flashcard deck:", err);
        setError("Failed to load flashcard deck");
      } finally {
        setLoading(false);
      }
    };

    if (deckId) {
      fetchDeck();
    }
  }, [deckId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Spinner />
      </div>
    );
  }

  if (error || !deck) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-600 mb-6">
        <h3 className="font-medium mb-1">Error</h3>
        <p>{error || "Flashcard deck not found"}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <FlashcardDeck
        cards={deck.flashcards}
        title={deck.title}
        description={deck.description}
      />
    </div>
  );
};

export default FlashcardDeckPage;
