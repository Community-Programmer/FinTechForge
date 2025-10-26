import { useEffect, useState } from "react";
import { QuizContainer, QuizQuestion } from "@/components/Education/QuizContainer";

interface Quiz {
  title: string;
  description: string;
  questions: QuizQuestion[];
  xpReward: number;
}

export default function QuizPage({ quizId }: { quizId: string }) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  
  useEffect(() => {
    fetch(`/api/v1/education/quiz/${quizId}`)
      .then(res => res.json())
      .then(data => setQuiz(data.quiz));
  }, [quizId]);
  
  if (!quiz) return <div>Loading...</div>;
  
  return (
    <QuizContainer
      title={quiz.title}
      description={quiz.description}
      questions={quiz.questions}
      xpReward={quiz.xpReward}
      // onComplete={...} // handle quiz submission here
    />
  );
}