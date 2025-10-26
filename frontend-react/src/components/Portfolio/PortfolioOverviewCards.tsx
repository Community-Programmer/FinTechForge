import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart,
  Target,
  Calendar
} from 'lucide-react';

const PortfolioOverviewCards: React.FC = () => {
  const { summary } = useSelector((state: RootState) => state.portfolio);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatPercentage = (percentage: number): string => {
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  const cards = [
    {
      title: "Portfolio Value",
      value: formatCurrency(summary.totalValue),
      description: "Current market value",
      icon: DollarSign,
      trend: null,
    },
    {
      title: "Total Return",
      value: formatCurrency(summary.totalGainLoss),
      description: (
        <Badge variant={summary.totalGainLoss >= 0 ? 'default' : 'destructive'}>
          {formatPercentage(summary.totalGainLossPercentage)}
        </Badge>
      ),
      icon: summary.totalGainLoss >= 0 ? TrendingUp : TrendingDown,
      trend: summary.totalGainLoss >= 0 ? 'positive' : 'negative',
    },
    {
      title: "Total Investment",
      value: formatCurrency(summary.totalInvestment),
      description: "Amount invested",
      icon: Target,
      trend: null,
    },
    {
      title: "Holdings Count",
      value: summary.totalHoldings.toString(),
      description: "Active positions",
      icon: PieChart,
      trend: null,
    },
    {
      title: "Day Change",
      value: formatCurrency(summary.dayGainLoss),
      description: (
        <Badge variant={summary.dayGainLoss >= 0 ? 'default' : 'destructive'}>
          {formatPercentage(summary.dayGainLossPercentage)}
        </Badge>
      ),
      icon: summary.dayGainLoss >= 0 ? TrendingUp : TrendingDown,
      trend: summary.dayGainLoss >= 0 ? 'positive' : 'negative',
    },
    {
      title: "Last Updated",
      value: new Date(summary.lastUpdated).toLocaleDateString(),
      description: new Date(summary.lastUpdated).toLocaleTimeString(),
      icon: Calendar,
      trend: null,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {cards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <IconComponent 
                className={`h-4 w-4 ${
                  card.trend === 'positive' 
                    ? 'text-green-600' 
                    : card.trend === 'negative' 
                    ? 'text-red-600' 
                    : 'text-muted-foreground'
                }`} 
              />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${
                card.trend === 'positive' 
                  ? 'text-green-600' 
                  : card.trend === 'negative' 
                  ? 'text-red-600' 
                  : ''
              }`}>
                {card.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {card.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default PortfolioOverviewCards;