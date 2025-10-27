import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, TrendingUp, CreditCard, Target } from 'lucide-react';
import { SIPCalculator } from './calculators/SIPCalculator';
import { LoanEMICalculator } from './calculators/LoanEMICalculator';
import { SavingsGoalCalculator } from './calculators/SavingsGoalCalculator';

const FinancialCalculator: React.FC = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Calculators</h1>
          <p className="text-muted-foreground">
            Tools to help you make informed financial decisions
          </p>
        </div>
        <Calculator className="h-10 w-10 text-blue-600" />
      </div>

      {/* Calculator Tabs */}
      <Tabs defaultValue="sip" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sip" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            SIP Calculator
          </TabsTrigger>
          <TabsTrigger value="loan" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Loan EMI
          </TabsTrigger>
          <TabsTrigger value="savings" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Savings Goal
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sip" className="space-y-4">
          <SIPCalculator />
        </TabsContent>

        <TabsContent value="loan" className="space-y-4">
          <LoanEMICalculator />
        </TabsContent>

        <TabsContent value="savings" className="space-y-4">
          <SavingsGoalCalculator />
        </TabsContent>
      </Tabs>

      {/* Information Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SIP Calculator</CardTitle>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription>
              Calculate potential returns on systematic investment plans
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Loan EMI</CardTitle>
            <CreditCard className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription>
              Calculate monthly loan payments and interest costs
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings Goal</CardTitle>
            <Target className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription>
              Plan how much to save to achieve your financial goals
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancialCalculator;