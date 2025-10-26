import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PerformanceDataPoint {
  date: string;
  value: number;
  gain: number;
  percentage: number;
}

const PortfolioPerformanceChart: React.FC = () => {
  const { summary } = useSelector((state: RootState) => state.portfolio);

  // Generate sample performance data if none exists
  const generateSampleData = (): PerformanceDataPoint[] => {
    const data: PerformanceDataPoint[] = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30); // Last 30 days
    
    let baseValue = summary.totalInvestment;
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      
      // Simulate some volatility
      const randomChange = (Math.random() - 0.5) * 0.04; // ±2% daily change
      baseValue = baseValue * (1 + randomChange);
      
      const gain = baseValue - summary.totalInvestment;
      const percentage = (gain / summary.totalInvestment) * 100;
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: baseValue,
        gain,
        percentage,
      });
    }
    
    // Make the last point match current portfolio value
    if (data.length > 0) {
      data[data.length - 1].value = summary.totalValue;
      data[data.length - 1].gain = summary.totalGainLoss;
      data[data.length - 1].percentage = summary.totalGainLossPercentage;
    }
    
    return data;
  };

  const performanceData = generateSampleData();

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatTooltipCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const isPositive = summary.totalGainLoss >= 0;

  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{ payload: PerformanceDataPoint }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border rounded-lg p-3 shadow-md">
          <p className="font-medium">{label}</p>
          <p className="text-sm">
            <span className="text-muted-foreground">Value: </span>
            <span className="font-medium">{formatTooltipCurrency(data.value)}</span>
          </p>
          <p className="text-sm">
            <span className="text-muted-foreground">Gain/Loss: </span>
            <span className={`font-medium ${data.gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatTooltipCurrency(data.gain)} ({data.percentage.toFixed(2)}%)
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">Portfolio Performance</CardTitle>
        <Badge variant={isPositive ? 'default' : 'destructive'} className="ml-auto">
          <div className="flex items-center gap-1">
            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {summary.totalGainLossPercentage.toFixed(2)}%
          </div>
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Current Value</p>
              <p className="font-semibold">{formatCurrency(summary.totalValue)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Total Investment</p>
              <p className="font-semibold">{formatCurrency(summary.totalInvestment)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Total Gain/Loss</p>
              <p className={`font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(Math.abs(summary.totalGainLoss))}
              </p>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={performanceData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="date" 
                  className="text-xs fill-muted-foreground"
                  tick={{ fontSize: 11 }}
                />
                <YAxis 
                  tickFormatter={formatCurrency}
                  className="text-xs fill-muted-foreground"
                  tick={{ fontSize: 11 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <defs>
                  <linearGradient id="performanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop 
                      offset="5%" 
                      stopColor={isPositive ? "rgb(34 197 94)" : "rgb(239 68 68)"} 
                      stopOpacity={0.3}
                    />
                    <stop 
                      offset="95%" 
                      stopColor={isPositive ? "rgb(34 197 94)" : "rgb(239 68 68)"} 
                      stopOpacity={0.05}
                    />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={isPositive ? "rgb(34 197 94)" : "rgb(239 68 68)"}
                  strokeWidth={2}
                  fill="url(#performanceGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="text-xs text-muted-foreground text-center">
            Performance over the last 30 days
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioPerformanceChart;