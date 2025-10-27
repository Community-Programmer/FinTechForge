import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
// import { Alert, AlertDescription } from '@/components/ui/alert';
import { TrendingDown, TrendingUp, AlertTriangle, CheckCircle, DollarSign, Calendar } from 'lucide-react';

interface HoldingPosition {
  id: string;
  symbol: string;
  shares: number;
  averageCost: number;
  currentPrice: number;
  purchaseDate: string;
  unrealizedGainLoss: number;
  marketValue: number;
}

interface HarvestingOpportunity {
  id: string;
  symbol: string;
  potentialLoss: number;
  taxSavings: number;
  washSaleRisk: boolean;
  recommendedAction: string;
  similarity: string[];
  daysUntilSafe: number;
}

interface TaxLossHarvestingProps {
  onHarvestingUpdate: (opportunities: HarvestingOpportunity[]) => void;
}

const TaxLossHarvesting: React.FC<TaxLossHarvestingProps> = ({ onHarvestingUpdate }) => {
  const [holdings] = useState<HoldingPosition[]>([
    {
      id: '1',
      symbol: 'AAPL',
      shares: 100,
      averageCost: 180,
      currentPrice: 150,
      purchaseDate: '2024-09-15',
      unrealizedGainLoss: -3000,
      marketValue: 15000
    },
    {
      id: '2',
      symbol: 'TSLA',
      shares: 50,
      averageCost: 300,
      currentPrice: 250,
      purchaseDate: '2024-08-01',
      unrealizedGainLoss: -2500,
      marketValue: 12500
    },
    {
      id: '3',
      symbol: 'MSFT',
      shares: 80,
      averageCost: 350,
      currentPrice: 420,
      purchaseDate: '2024-07-10',
      unrealizedGainLoss: 5600,
      marketValue: 33600
    }
  ]);

  const [taxRate, setTaxRate] = useState(22); // Tax rate percentage
  const [selectedOpportunities, setSelectedOpportunities] = useState<string[]>([]);

  // Calculate tax loss harvesting opportunities
  const calculateOpportunities = (): HarvestingOpportunity[] => {
    const opportunities: HarvestingOpportunity[] = [];

    holdings.forEach(holding => {
      if (holding.unrealizedGainLoss < 0) {
        const potentialLoss = Math.abs(holding.unrealizedGainLoss);
        const taxSavings = potentialLoss * (taxRate / 100);
        
        // Check wash sale risk (simplified - within 30 days)
        const daysSincePurchase = Math.floor((Date.now() - new Date(holding.purchaseDate).getTime()) / (1000 * 60 * 60 * 24));
        const washSaleRisk = daysSincePurchase < 30;
        
        // Get similar securities suggestions
        const similarities = getSimilarSecurities(holding.symbol);

        opportunities.push({
          id: holding.id,
          symbol: holding.symbol,
          potentialLoss,
          taxSavings,
          washSaleRisk,
          recommendedAction: washSaleRisk ? 'Wait for wash sale period' : 'Harvest loss now',
          similarity: similarities,
          daysUntilSafe: Math.max(0, 30 - daysSincePurchase)
        });
      }
    });

    onHarvestingUpdate(opportunities);
    return opportunities;
  };

  const getSimilarSecurities = (symbol: string): string[] => {
    const similarityMap: { [key: string]: string[] } = {
      'AAPL': ['QQQ', 'VGT', 'XLK'],
      'TSLA': ['ARKK', 'ICLN', 'PBW'],
      'MSFT': ['QQQ', 'VGT', 'XLK'],
      'GOOGL': ['QQQ', 'VGT', 'XLK'],
      'AMZN': ['QQQ', 'VGT', 'XLY'],
      'META': ['QQQ', 'VGT', 'XLC']
    };
    
    return similarityMap[symbol] || ['SPY', 'VTI', 'QQQ'];
  };

  const opportunities = calculateOpportunities();
  const totalPotentialSavings = opportunities.reduce((sum, opp) => sum + opp.taxSavings, 0);

  const toggleOpportunitySelection = (opportunityId: string) => {
    setSelectedOpportunities(prev => 
      prev.includes(opportunityId) 
        ? prev.filter(id => id !== opportunityId)
        : [...prev, opportunityId]
    );
  };

  const executeHarvesting = () => {
    // In a real app, this would execute the trades
    alert(`Would execute tax loss harvesting for ${selectedOpportunities.length} positions`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatPercentage = (value: number, total: number) => {
    return ((value / total) * 100).toFixed(2);
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(holdings.reduce((sum, h) => sum + h.marketValue, 0))}
            </div>
            <p className="text-xs text-muted-foreground">
              Across {holdings.length} positions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unrealized Losses</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(holdings.filter(h => h.unrealizedGainLoss < 0).reduce((sum, h) => sum + h.unrealizedGainLoss, 0))}
            </div>
            <p className="text-xs text-muted-foreground">
              {holdings.filter(h => h.unrealizedGainLoss < 0).length} losing positions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Potential Tax Savings</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(totalPotentialSavings)}
            </div>
            <p className="text-xs text-muted-foreground">
              At {taxRate}% tax rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tax Rate Setting */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Rate Configuration</CardTitle>
          <CardDescription>Set your marginal tax rate for accurate savings calculations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <span>Tax Rate:</span>
            <div className="flex gap-2">
              {[12, 22, 24, 32, 35, 37].map(rate => (
                <Button
                  key={rate}
                  variant={taxRate === rate ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTaxRate(rate)}
                >
                  {rate}%
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Holdings Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Current Holdings</CardTitle>
          <CardDescription>Your current positions with gain/loss analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {holdings.map((holding) => (
              <div key={holding.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="font-medium">{holding.symbol}</div>
                  <div className="text-sm text-muted-foreground">
                    {holding.shares} shares @ {formatCurrency(holding.averageCost)} avg
                  </div>
                  <div className="text-sm">
                    Current: {formatCurrency(holding.currentPrice)}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-muted-foreground">
                    {formatCurrency(holding.marketValue)}
                  </div>
                  <div className={`flex items-center gap-1 font-medium ${holding.unrealizedGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {holding.unrealizedGainLoss >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {formatCurrency(holding.unrealizedGainLoss)}
                    <span className="text-xs">
                      ({formatPercentage(holding.unrealizedGainLoss, holding.marketValue - holding.unrealizedGainLoss)}%)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Harvesting Opportunities */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Tax Loss Harvesting Opportunities</CardTitle>
            <CardDescription>
              Identify positions where you can harvest losses for tax benefits
            </CardDescription>
          </div>
          {selectedOpportunities.length > 0 && (
            <Button onClick={executeHarvesting} className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Execute Selected ({selectedOpportunities.length})
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {opportunities.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No tax loss harvesting opportunities available at this time.
            </div>
          ) : (
            <div className="space-y-4">
              {opportunities.map((opportunity) => (
                <div key={opportunity.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedOpportunities.includes(opportunity.id)}
                        onChange={() => toggleOpportunitySelection(opportunity.id)}
                        className="rounded"
                      />
                      <div>
                        <div className="font-medium text-lg">{opportunity.symbol}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={opportunity.washSaleRisk ? "destructive" : "default"}>
                            {opportunity.recommendedAction}
                          </Badge>
                          {opportunity.washSaleRisk && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {opportunity.daysUntilSafe} days until safe
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-red-600">
                        {formatCurrency(-opportunity.potentialLoss)}
                      </div>
                      <div className="text-sm font-medium text-green-600">
                        Save {formatCurrency(opportunity.taxSavings)}
                      </div>
                    </div>
                  </div>

                  {opportunity.washSaleRisk && (
                    <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <div className="text-sm text-yellow-800">
                        <strong>Wash Sale Warning:</strong> You purchased this security within the last 30 days. 
                        Selling now may trigger the wash sale rule, disallowing the tax deduction.
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="text-sm font-medium mb-2">Alternative Investments (to avoid wash sale):</div>
                    <div className="flex gap-2">
                      {opportunity.similarity.map((similar) => (
                        <Badge key={similar} variant="outline" className="text-xs">
                          {similar}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary */}
      {opportunities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Harvesting Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Harvestable Losses:</span>
                  <span className="font-medium text-red-600">
                    {formatCurrency(-opportunities.reduce((sum, opp) => sum + opp.potentialLoss, 0))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Immediate Tax Savings:</span>
                  <span className="font-medium text-green-600">
                    {formatCurrency(totalPotentialSavings)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Positions with Wash Sale Risk:</span>
                  <span className="font-medium">
                    {opportunities.filter(opp => opp.washSaleRisk).length}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Tax loss harvesting can help offset capital gains and reduce your tax liability. 
                  Remember the wash sale rule: you cannot claim a tax loss if you buy the same 
                  security within 30 days before or after the sale.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TaxLossHarvesting;