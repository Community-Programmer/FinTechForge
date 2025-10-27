import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const SIPCalculator: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState<string>('1000');
  const [years, setYears] = useState<string>('10');
  const [returnRate, setReturnRate] = useState<string>('12');

  const calculateSIP = () => {
    const monthly = parseFloat(monthlyInvestment) || 0;
    const yearsNum = parseFloat(years) || 0;
    const rate = parseFloat(returnRate) || 0;
    
    if (monthly <= 0 || yearsNum <= 0 || rate <= 0) {
      return { investedAmount: 0, estimatedReturns: 0, totalValue: 0 };
    }

    const months = yearsNum * 12;
    const monthlyRate = rate / 100 / 12;

    // Compound interest calculation for SIP
    const totalValue = monthly * (Math.pow(1 + monthlyRate, months) - 1) * (1 + monthlyRate) / monthlyRate;
    const investedAmount = monthly * months;
    const estimatedReturns = totalValue - investedAmount;

    return {
      investedAmount: investedAmount,
      estimatedReturns: estimatedReturns,
      totalValue: totalValue
    };
  };

  const { investedAmount, estimatedReturns, totalValue } = calculateSIP();

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleReset = () => {
    setMonthlyInvestment('1000');
    setYears('10');
    setReturnRate('12');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>SIP Calculator</CardTitle>
        <CardDescription>Calculate potential returns on systematic investment plans</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="monthlyInvestment">Monthly Investment ($)</Label>
              <Input
                id="monthlyInvestment"
                type="number"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(e.target.value)}
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="years">Time Period (Years)</Label>
              <Input
                id="years"
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="returnRate">Expected Return Rate (p.a.) (%)</Label>
              <Input
                id="returnRate"
                type="number"
                value={returnRate}
                onChange={(e) => setReturnRate(e.target.value)}
                min="0"
                step="0.1"
              />
            </div>
            <Button onClick={handleReset} variant="outline">Reset</Button>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Your Potential Returns</h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm text-muted-foreground">Total Investment</span>
                <span className="font-medium">{formatCurrency(investedAmount)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm text-muted-foreground">Estimated Returns</span>
                <span className="font-medium text-green-600">+{formatCurrency(estimatedReturns)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                <span className="text-sm text-muted-foreground">Total Value</span>
                <span className="text-lg font-bold">{formatCurrency(totalValue)}</span>
              </div>
            </div>

            {/* Chart representation */}
            <div className="mt-4">
              <div className="h-32 w-full bg-gray-100 rounded-lg flex items-end p-2">
                <div 
                  className="w-1/3 bg-blue-500 rounded-sm" 
                  style={{ height: `${Math.min(100, (investedAmount / totalValue) * 100)}%` }}
                ></div>
                <div 
                  className="w-1/3 bg-green-500 rounded-sm ml-1" 
                  style={{ height: `${Math.min(100, (estimatedReturns / totalValue) * 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-center gap-4 mt-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                  <span className="text-xs">Invested</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                  <span className="text-xs">Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};