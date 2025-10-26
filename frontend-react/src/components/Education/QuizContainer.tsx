import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizContainerProps {
  title: string;
  description: string;
  questions: QuizQuestion[];
  xpReward: number;
  onComplete?: (score: number, totalQuestions: number) => void;
}

export const QuizContainer: React.FC<QuizContainerProps> = ({
  title,
  description,
  questions,
  xpReward,
  onComplete,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;

    setIsAnswered(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsQuizComplete(true);
      if (onComplete) {
        onComplete(
          score + (selectedOption === currentQuestion.correctAnswer ? 1 : 0),
          questions.length
        );
      }
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-4">
        <h3 className="font-semibold text-xl">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 w-full bg-gray-100 rounded-full mb-4">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{
            width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      {!isQuizComplete ? (
        <Card className="p-6 mb-4">
          {/* Question */}
          <div className="mb-6">
            <span className="text-sm text-gray-500">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <h4 className="text-lg font-medium mt-1">
              {currentQuestion.question}
            </h4>
          </div>

          {/* Options */}
          <RadioGroup value={selectedOption?.toString()} className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center border rounded-lg p-3 cursor-pointer ${
                  isAnswered && index === currentQuestion.correctAnswer
                    ? "border-green-500 bg-green-50"
                    : isAnswered && index === selectedOption
                    ? "border-red-500 bg-red-50"
                    : selectedOption === index
                    ? "border-blue-500"
                    : "border-gray-200"
                }`}
                onClick={() => handleOptionSelect(index)}
              >
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                  checked={selectedOption === index}
                  disabled={isAnswered}
                />
                <Label
                  htmlFor={`option-${index}`}
                  className="pl-2 flex-grow cursor-pointer"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {/* Explanation */}
          {isAnswered && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm">{currentQuestion.explanation}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between mt-6">
            <div className="text-amber-500 font-medium">
              {isAnswered
                ? `+${Math.round(xpReward / questions.length)} XP`
                : ""}
            </div>
            <Button
              onClick={isAnswered ? handleNextQuestion : handleCheckAnswer}
            >
              {isAnswered
                ? currentQuestionIndex < questions.length - 1
                  ? "Next Question"
                  : "Complete Quiz"
                : "Check Answer"}
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Quiz Complete!</h3>
          <p className="text-lg mb-4">
            Your score: {score} / {questions.length}
          </p>
          <p className="text-amber-500 text-lg font-medium mb-6">
            +{xpReward} XP Earned!
          </p>
          <Button onClick={() => (window.location.href = "/education")}>
            Return to Education Hub
          </Button>
        </Card>
      )}
    </div>
  );
};
