import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export const SavingsGoalCalculator: React.FC = () => {
  const [goalAmount, setGoalAmount] = useState<string>('50000');
  const [currentSavings, setCurrentSavings] = useState<string>('5000');
  const [timePeriod, setTimePeriod] = useState<string>('5');
  const [interestRate, setInterestRate] = useState<string>('8');

  const calculateSavings = () => {
    const goal = parseFloat(goalAmount) || 0;
    const current = parseFloat(currentSavings) || 0;
    const years = parseFloat(timePeriod) || 0;
    const rate = parseFloat(interestRate) || 0;
    
    if (goal <= 0 || years <= 0 || rate <= 0) {
      return { monthlySavings: 0, totalRequired: 0, shortfall: 0 };
    }

    const requiredAmount = goal - current;
    const months = years * 12;
    const monthlyRate = rate / 100 / 12;

    // Calculate the monthly savings needed to reach the goal
    // Future value of annuity formula: FV = PMT * [((1 + r)^n - 1) / r]
    // Solving for PMT: PMT = FV / [((1 + r)^n - 1) / r]
    let monthlySavings;
    if (monthlyRate === 0) {
      // If interest rate is 0, use simple division
      monthlySavings = requiredAmount / months;
    } else {
      const factor = (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
      monthlySavings = requiredAmount / factor;
    }

    const totalRequired = monthlySavings * months;
    const shortfall = requiredAmount - totalRequired;

    return {
      monthlySavings: monthlySavings,
      totalRequired: totalRequired,
      shortfall: shortfall
    };
  };

  const { monthlySavings, totalRequired, shortfall } = calculateSavings();

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US').format(Math.round(num));
  };

  const handleReset = () => {
    setGoalAmount('50000');
    setCurrentSavings('5000');
    setTimePeriod('5');
    setInterestRate('8');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Savings Goal Calculator</CardTitle>
        <CardDescription>Plan how much to save to achieve your financial goals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="goalAmount">Goal Amount ($)</Label>
              <Input
                id="goalAmount"
                type="number"
                value={goalAmount}
                onChange={(e) => setGoalAmount(e.target.value)}
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="currentSavings">Current Savings ($)</Label>
              <Input
                id="currentSavings"
                type="number"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(e.target.value)}
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="timePeriod">Time Period (Years)</Label>
              <Input
                id="timePeriod"
                type="number"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="interestRate">Expected Interest Rate (p.a.) (%)</Label>
              <Input
                id="interestRate"
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                min="0"
                step="0.1"
              />
            </div>
            <Button onClick={handleReset} variant="outline">Reset</Button>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Savings Plan</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm text-muted-foreground">Monthly Savings Required</span>
                <span className="text-lg font-bold">{formatCurrency(monthlySavings)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm text-muted-foreground">Total Amount Required</span>
                <span className="font-medium text-green-600">{formatCurrency(totalRequired)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                <span className="text-sm text-muted-foreground">Goal Amount</span>
                <span className="text-lg font-bold">{formatCurrency(parseFloat(goalAmount) || 0)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-muted-foreground">Current Savings</span>
                <span className="font-medium">{formatCurrency(parseFloat(currentSavings) || 0)}</span>
              </div>
            </div>

            {/* Progress Visualization */}
            <div className="mt-4">
              <div className="h-32 w-full bg-gray-100 rounded-lg flex items-end p-2">
                <div 
                  className="w-full bg-blue-500 rounded-sm" 
                  style={{ height: `${Math.min(100, (parseFloat(currentSavings) / parseFloat(goalAmount)) * 100 || 0)}%` }}
                ></div>
              </div>
              <div className="text-center mt-2">
                <span className="text-sm text-muted-foreground">
                  You are {((parseFloat(currentSavings) / parseFloat(goalAmount)) * 100 || 0).toFixed(1)}% towards your goal
                </span>
              </div>
            </div>

            <div className="text-sm text-muted-foreground mt-4">
              <p><strong>Time Period:</strong> {formatNumber(parseFloat(timePeriod) * 12 || 0)} months</p>
              <p><strong>Interest Rate:</strong> {parseFloat(interestRate) || 0}% p.a.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};