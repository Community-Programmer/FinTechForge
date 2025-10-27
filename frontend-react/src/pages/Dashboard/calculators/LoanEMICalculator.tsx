import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export const LoanEMICalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<string>('100000');
  const [interestRate, setInterestRate] = useState<string>('10');
  const [loanTenure, setLoanTenure] = useState<string>('10');

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount) || 0;
    const annualInterestRate = parseFloat(interestRate) || 0;
    const tenureInYears = parseFloat(loanTenure) || 0;
    
    if (principal <= 0 || annualInterestRate <= 0 || tenureInYears <= 0) {
      return { emi: 0, totalInterest: 0, totalPayment: 0 };
    }

    const monthlyInterestRate = annualInterestRate / 100 / 12;
    const tenureInMonths = tenureInYears * 12;

    // EMI calculation formula: EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
    const emi = 
      principal * 
      monthlyInterestRate * 
      Math.pow(1 + monthlyInterestRate, tenureInMonths) / 
      (Math.pow(1 + monthlyInterestRate, tenureInMonths) - 1);

    const totalPayment = emi * tenureInMonths;
    const totalInterest = totalPayment - principal;

    return {
      emi: emi,
      totalInterest: totalInterest,
      totalPayment: totalPayment
    };
  };

  const { emi, totalInterest, totalPayment } = calculateEMI();

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
    setLoanAmount('100000');
    setInterestRate('10');
    setLoanTenure('10');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Loan EMI Calculator</CardTitle>
        <CardDescription>Calculate monthly loan payments and interest costs</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="loanAmount">Loan Amount ($)</Label>
              <Input
                id="loanAmount"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="interestRate">Interest Rate (p.a.) (%)</Label>
              <Input
                id="interestRate"
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                min="0"
                step="0.1"
              />
            </div>
            <div>
              <Label htmlFor="loanTenure">Loan Tenure (Years)</Label>
              <Input
                id="loanTenure"
                type="number"
                value={loanTenure}
                onChange={(e) => setLoanTenure(e.target.value)}
                min="0"
              />
            </div>
            <Button onClick={handleReset} variant="outline">Reset</Button>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Loan Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm text-muted-foreground">Monthly EMI</span>
                <span className="text-lg font-bold">{formatCurrency(emi)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm text-muted-foreground">Total Interest</span>
                <span className="font-medium text-green-600">{formatCurrency(totalInterest)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                <span className="text-sm text-muted-foreground">Total Payment</span>
                <span className="text-lg font-bold">{formatCurrency(totalPayment)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-muted-foreground">Principal Amount</span>
                <span className="font-medium">{formatCurrency(parseFloat(loanAmount) || 0)}</span>
              </div>
            </div>

            {/* Loan Breakdown Chart */}
            <div className="mt-4">
              <div className="h-32 w-full bg-gray-100 rounded-lg flex items-end p-2">
                <div 
                  className="w-1/2 bg-blue-500 rounded-sm" 
                  style={{ height: `${(parseFloat(loanAmount) || 0) / totalPayment * 100}%` }}
                ></div>
                <div 
                  className="w-1/2 bg-green-500 rounded-sm ml-1" 
                  style={{ height: `${totalInterest / totalPayment * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-center gap-4 mt-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                  <span className="text-xs">Principal</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                  <span className="text-xs">Interest</span>
                </div>
              </div>
            </div>

            <div className="text-sm text-muted-foreground mt-4">
              <p><strong>Loan Duration:</strong> {formatNumber(parseFloat(loanTenure) * 12 || 0)} months</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};