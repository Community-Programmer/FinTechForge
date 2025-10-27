import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Calculator, 
  TrendingDown, 
  FileText, 
  CheckCircle, 
  DollarSign,
  PieChart,
  Target
} from 'lucide-react';
import {
  CapitalGainsCalculator,
  TaxLossHarvesting,
  TaxReports,
  TaxStrategies,
  TaxChecklist
} from './components';

interface TaxSummary {
  totalGains: number;
  totalLosses: number;
  netGainLoss: number;
  estimatedTaxLiability: number;
  potentialSavings: number;
}

const TaxCenter: React.FC = () => {
  const [taxSummary, setTaxSummary] = useState<TaxSummary>({
    totalGains: 15420.50,
    totalLosses: -3200.75,
    netGainLoss: 12219.75,
    estimatedTaxLiability: 2443.95,
    potentialSavings: 680.15
  });

  const [currentTaxYear, setCurrentTaxYear] = useState(new Date().getFullYear());
  const [checklistProgress] = useState(65); // percentage

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getTaxStatus = (netGainLoss: number) => {
    if (netGainLoss > 0) {
      return { status: 'Tax Liability', color: 'destructive', icon: DollarSign };
    } else {
      return { status: 'Tax Loss', color: 'default', icon: TrendingDown };
    }
  };

  const taxStatus = getTaxStatus(taxSummary.netGainLoss);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tax Center</h1>
          <p className="text-muted-foreground">
            Optimize your tax strategy and maximize your returns for {currentTaxYear}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select 
            value={currentTaxYear} 
            onChange={(e) => setCurrentTaxYear(parseInt(e.target.value))}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value={2025}>Tax Year 2025</option>
            <option value={2024}>Tax Year 2024</option>
            <option value={2023}>Tax Year 2023</option>
          </select>
        </div>
      </div>

      {/* Tax Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Capital Gains</CardTitle>
            <TrendingDown className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(taxSummary.totalGains)}
            </div>
            <p className="text-xs text-muted-foreground">
              From investment sales
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Capital Losses</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(taxSummary.totalLosses)}
            </div>
            <p className="text-xs text-muted-foreground">
              Available for deduction
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Gain/Loss</CardTitle>
            <taxStatus.icon className={`h-4 w-4 ${taxSummary.netGainLoss >= 0 ? 'text-red-600' : 'text-green-600'}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${taxSummary.netGainLoss >= 0 ? 'text-red-600' : 'text-green-600'}`}>
              {formatCurrency(taxSummary.netGainLoss)}
            </div>
            <Badge variant={taxStatus.color as "default" | "secondary" | "destructive" | "outline"} className="text-xs">
              {taxStatus.status}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Est. Tax Liability</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(taxSummary.estimatedTaxLiability)}
            </div>
            <p className="text-xs text-green-600">
              Save {formatCurrency(taxSummary.potentialSavings)} with optimization
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tax Planning Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Tax Planning Progress
          </CardTitle>
          <CardDescription>
            Complete your year-end tax planning checklist
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{checklistProgress}% Complete</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300" 
                style={{ width: `${checklistProgress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {checklistProgress >= 80 ? 'Almost done! ' : ''}
              {100 - checklistProgress > 0 && `${Math.ceil((100 - checklistProgress) / 10)} tasks remaining`}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="calculator" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="calculator" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Calculator
          </TabsTrigger>
          <TabsTrigger value="harvesting" className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4" />
            Tax Loss Harvesting
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Reports
          </TabsTrigger>
          <TabsTrigger value="strategies" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Strategies
          </TabsTrigger>
          <TabsTrigger value="checklist" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Checklist
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-4">
          <CapitalGainsCalculator onCalculationUpdate={setTaxSummary} />
        </TabsContent>

        <TabsContent value="harvesting" className="space-y-4">
          <TaxLossHarvesting onHarvestingUpdate={() => {}} />
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <TaxReports />
        </TabsContent>

        <TabsContent value="strategies" className="space-y-4">
          <TaxStrategies />
        </TabsContent>

        <TabsContent value="checklist" className="space-y-4">
          <TaxChecklist 

          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaxCenter;