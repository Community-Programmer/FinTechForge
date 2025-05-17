import React, { useState } from 'react';
import styles from './FinancialHealthScore.module.css';
import { calculateScore } from './scoreUtils';

const FinancialHealthScore: React.FC = () => {
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);
  const [savings, setSavings] = useState<number>(0);
  const [debt, setDebt] = useState<number>(0);
  const [score, setScore] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = calculateScore({ income, expenses, savings, debt });
    setScore(result);
  };

  return (
    <div className={styles.container}>
      <h2>💰 Financial Health Score Calculator</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Monthly Income" onChange={e => setIncome(+e.target.value)} />
        <input type="number" placeholder="Monthly Expenses" onChange={e => setExpenses(+e.target.value)} />
        <input type="number" placeholder="Monthly Savings" onChange={e => setSavings(+e.target.value)} />
        <input type="number" placeholder="Monthly Debt" onChange={e => setDebt(+e.target.value)} />
        <button type="submit">Calculate</button>
      </form>

      {score !== null && (
        <div className={styles.result}>
          <h3>Your Score: {score}/100</h3>
          <p>
            {score >= 80
              ? "🎉 Excellent! You're financially healthy."
              : score >= 60
              ? "👍 Good! But you can improve."
              : score >= 40
              ? "⚠️ Average. Consider budgeting better."
              : "🚨 Poor. Start saving and reduce debts."}
          </p>
        </div>
      )}
    </div>
  );
};

export default FinancialHealthScore;
