import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Plus, Trash2, TrendingUp, TrendingDown } from 'lucide-react';

interface Investment {
  id: string;
  symbol: string;
  purchasePrice: number;
  salePrice: number;
  shares: number;
  purchaseDate: string;
  saleDate: string;
  holdingPeriod: 'short' | 'long'; // < 1 year = short, >= 1 year = long
}

interface TaxSummary {
  totalGains: number;
  totalLosses: number;
  netGainLoss: number;
  estimatedTaxLiability: number;
  potentialSavings: number;
}

interface CapitalGainsCalculatorProps {
  onCalculationUpdate: (summary: TaxSummary) => void;
}

// Tax rates (simplified)
const TAX_RATES = {
  short_term: {
    single: { 10: 0.10, 12: 0.12, 22: 0.22, 24: 0.24, 32: 0.32, 35: 0.35, 37: 0.37 },
    married: { 10: 0.10, 12: 0.12, 22: 0.22, 24: 0.24, 32: 0.32, 35: 0.35, 37: 0.37 }
  },
  long_term: {
    single: { 0: 0.00, 15: 0.15, 20: 0.20 },
    married: { 0: 0.00, 15: 0.15, 20: 0.20 }
  }
};

const CapitalGainsCalculator: React.FC<CapitalGainsCalculatorProps> = ({ onCalculationUpdate }) => {
  const [investments, setInvestments] = useState<Investment[]>([
    {
      id: '1',
      symbol: 'AAPL',
      purchasePrice: 150,
      salePrice: 180,
      shares: 100,
      purchaseDate: '2023-01-15',
      saleDate: '2024-10-15',
      holdingPeriod: 'long'
    }
  ]);

  const [taxBracket, setTaxBracket] = useState('22'); // Tax bracket percentage
  const [filingStatus, setFilingStatus] = useState('single');


  const addInvestment = () => {
    const newInvestment: Investment = {
      id: Date.now().toString(),
      symbol: '',
      purchasePrice: 0,
      salePrice: 0,
      shares: 0,
      purchaseDate: '',
      saleDate: '',
      holdingPeriod: 'short'
    };
    setInvestments([...investments, newInvestment]);
  };

  const removeInvestment = (id: string) => {
    setInvestments(investments.filter(inv => inv.id !== id));
  };

  const updateInvestment = (id: string, field: keyof Investment, value: string | number) => {
    setInvestments(investments.map(inv => {
      if (inv.id === id) {
        const updated = { ...inv, [field]: value };
        
        // Auto-calculate holding period based on dates
        if (field === 'purchaseDate' || field === 'saleDate') {
          if (updated.purchaseDate && updated.saleDate) {
            const purchaseDate = new Date(updated.purchaseDate);
            const saleDate = new Date(updated.saleDate);
            const daysDiff = Math.abs(saleDate.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24);
            updated.holdingPeriod = daysDiff >= 365 ? 'long' : 'short';
          }
        }
        
        return updated;
      }
      return inv;
    }));
  };

  const calculateGainLoss = (investment: Investment) => {
    const gainLoss = (investment.salePrice - investment.purchasePrice) * investment.shares;
    return gainLoss;
  };

  const calculateTaxLiability = React.useCallback(() => {
    let shortTermGains = 0;
    let shortTermLosses = 0;
    let longTermGains = 0;
    let longTermLosses = 0;

    investments.forEach(inv => {
      const gainLoss = calculateGainLoss(inv);
      if (inv.holdingPeriod === 'short') {
        if (gainLoss > 0) shortTermGains += gainLoss;
        else shortTermLosses += Math.abs(gainLoss);
      } else {
        if (gainLoss > 0) longTermGains += gainLoss;
        else longTermLosses += Math.abs(gainLoss);
      }
    });

    // Net short-term and long-term
    const netShortTerm = shortTermGains - shortTermLosses;
    const netLongTerm = longTermGains - longTermLosses;

    // Tax calculation (simplified)
    const shortTermTaxRate = TAX_RATES.short_term[filingStatus as keyof typeof TAX_RATES.short_term]?.[parseInt(taxBracket) as keyof typeof TAX_RATES.short_term.single] || 0.22;
    const longTermTaxRate = parseInt(taxBracket) <= 12 ? 0 : parseInt(taxBracket) <= 22 ? 0.15 : 0.20;

    const shortTermTax = Math.max(netShortTerm, 0) * shortTermTaxRate;
    const longTermTax = Math.max(netLongTerm, 0) * longTermTaxRate;

    const totalGains = shortTermGains + longTermGains;
    const totalLosses = -(shortTermLosses + longTermLosses);
    const netGainLoss = totalGains + totalLosses;
    const estimatedTaxLiability = shortTermTax + longTermTax;

    // Calculate potential savings from tax-loss harvesting
    const potentialSavings = Math.min(shortTermLosses, shortTermGains) * (shortTermTaxRate - longTermTaxRate);

    const summary: TaxSummary = {
      totalGains,
      totalLosses,
      netGainLoss,
      estimatedTaxLiability,
      potentialSavings
    };

    onCalculationUpdate(summary);
    return summary;
  }, [investments, taxBracket, filingStatus, onCalculationUpdate]);

  React.useEffect(() => {
    calculateTaxLiability();
  }, [investments, taxBracket, filingStatus, calculateTaxLiability]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Tax Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Tax Settings
          </CardTitle>
          <CardDescription>
            Configure your tax bracket and filing status for accurate calculations
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="filing-status">Filing Status</Label>
            <Select value={filingStatus} onValueChange={setFilingStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="married">Married Filing Jointly</SelectItem>
                <SelectItem value="married-separate">Married Filing Separately</SelectItem>
                <SelectItem value="head">Head of Household</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tax-bracket">Tax Bracket</Label>
            <Select value={taxBracket} onValueChange={setTaxBracket}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10%</SelectItem>
                <SelectItem value="12">12%</SelectItem>
                <SelectItem value="22">22%</SelectItem>
                <SelectItem value="24">24%</SelectItem>
                <SelectItem value="32">32%</SelectItem>
                <SelectItem value="35">35%</SelectItem>
                <SelectItem value="37">37%</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Investment Entries */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Investment Transactions</CardTitle>
            <CardDescription>
              Add your investment sales to calculate capital gains and losses
            </CardDescription>
          </div>
          <Button onClick={addInvestment} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Transaction
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {investments.map((investment) => (
              <div key={investment.id} className="grid gap-4 p-4 border rounded-lg">
                <div className="grid gap-4 md:grid-cols-7">
                  <div className="space-y-2">
                    <Label>Symbol</Label>
                    <Input
                      placeholder="AAPL"
                      value={investment.symbol}
                      onChange={(e) => updateInvestment(investment.id, 'symbol', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Shares</Label>
                    <Input
                      type="number"
                      placeholder="100"
                      value={investment.shares || ''}
                      onChange={(e) => updateInvestment(investment.id, 'shares', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Purchase Price</Label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="150.00"
                      value={investment.purchasePrice || ''}
                      onChange={(e) => updateInvestment(investment.id, 'purchasePrice', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Sale Price</Label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="180.00"
                      value={investment.salePrice || ''}
                      onChange={(e) => updateInvestment(investment.id, 'salePrice', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Purchase Date</Label>
                    <Input
                      type="date"
                      value={investment.purchaseDate}
                      onChange={(e) => updateInvestment(investment.id, 'purchaseDate', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Sale Date</Label>
                    <Input
                      type="date"
                      value={investment.saleDate}
                      onChange={(e) => updateInvestment(investment.id, 'saleDate', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 flex flex-col">
                    <Label>Actions</Label>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => removeInvestment(investment.id)}
                      className="flex items-center gap-1"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                {/* Calculation Result */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-4 text-sm">
                    <span className={`px-2 py-1 rounded ${investment.holdingPeriod === 'long' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                      {investment.holdingPeriod === 'long' ? 'Long-term' : 'Short-term'}
                    </span>
                    <span className="text-muted-foreground">
                      Tax Rate: {investment.holdingPeriod === 'long' ? '0-20%' : `${taxBracket}%`}
                    </span>
                  </div>
                  <div className={`flex items-center gap-1 font-medium ${calculateGainLoss(investment) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {calculateGainLoss(investment) >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {formatCurrency(calculateGainLoss(investment))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Calculation Summary</CardTitle>
          <CardDescription>
            Based on your current transactions and tax settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Short-term Gains:</span>
                <span className="font-medium text-green-600">
                  {formatCurrency(investments.filter(inv => inv.holdingPeriod === 'short' && calculateGainLoss(inv) > 0)
                    .reduce((sum, inv) => sum + calculateGainLoss(inv), 0))}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Long-term Gains:</span>
                <span className="font-medium text-green-600">
                  {formatCurrency(investments.filter(inv => inv.holdingPeriod === 'long' && calculateGainLoss(inv) > 0)
                    .reduce((sum, inv) => sum + calculateGainLoss(inv), 0))}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Losses:</span>
                <span className="font-medium text-red-600">
                  {formatCurrency(investments.filter(inv => calculateGainLoss(inv) < 0)
                    .reduce((sum, inv) => sum + calculateGainLoss(inv), 0))}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-lg font-semibold">
                <span>Net Gain/Loss:</span>
                <span className={calculateTaxLiability().netGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {formatCurrency(calculateTaxLiability().netGainLoss)}
                </span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>Estimated Tax:</span>
                <span className="text-primary">
                  {formatCurrency(calculateTaxLiability().estimatedTaxLiability)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CapitalGainsCalculator;