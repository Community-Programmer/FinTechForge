interface FinancialData {
  income: number;
  expenses: number;
  savings: number;
  debt: number;
}

export const calculateScore = ({ income, expenses, savings, debt }: FinancialData): number => {
  if (!income || income === 0) return 0;

  const savingsRate = savings / income;
  const expenseRate = expenses / income;
  const debtRatio = debt / income;

  let score = 100 - (expenseRate * 30 + debtRatio * 40) + savingsRate * 40;
  return Math.max(0, Math.min(100, Math.round(score)));
};
