import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AssetCategory } from '@/types/portfolio';

interface AssetAllocation {
  category: AssetCategory;
  value: number;
  percentage: number;
  count: number;
}

const AssetAllocationChart: React.FC = () => {
  const { holdings, summary } = useSelector((state: RootState) => state.portfolio);

  // Calculate asset allocation
  const calculateAllocation = (): AssetAllocation[] => {
    const allocationMap = new Map<AssetCategory, { value: number; count: number }>();
    
    holdings.forEach((holding) => {
      const currentPrice = holding.currentPrice ?? holding.averagePrice;
      const marketValue = currentPrice * holding.quantity;
      
      const existing = allocationMap.get(holding.category) || { value: 0, count: 0 };
      allocationMap.set(holding.category, {
        value: existing.value + marketValue,
        count: existing.count + 1,
      });
    });

    const allocations: AssetAllocation[] = Array.from(allocationMap.entries()).map(
      ([category, { value, count }]) => ({
        category,
        value,
        percentage: (value / summary.totalValue) * 100,
        count,
      })
    );

    return allocations.sort((a, b) => b.value - a.value);
  };

  const allocationData = calculateAllocation();

  // Colors for different asset categories
  const categoryColors: Record<AssetCategory, string> = {
    [AssetCategory.STOCKS]: '#3b82f6',     // Blue
    [AssetCategory.BONDS]: '#10b981',      // Green
    [AssetCategory.ETF]: '#8b5cf6',        // Purple
    [AssetCategory.CRYPTO]: '#f59e0b',     // Orange
    [AssetCategory.COMMODITIES]: '#eab308', // Yellow
    [AssetCategory.REAL_ESTATE]: '#ef4444', // Red
    [AssetCategory.MUTUAL_FUND]: '#06b6d4', // Cyan
    [AssetCategory.CASH]: '#6b7280',       // Gray
    [AssetCategory.OTHER]: '#84cc16',      // Lime
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const CustomTooltip = ({ active, payload }: {
    active?: boolean;
    payload?: Array<{ value: number; payload: AssetAllocation }>;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border rounded-lg p-3 shadow-md">
          <p className="font-medium">{data.category}</p>
          <p className="text-sm">
            <span className="text-muted-foreground">Value: </span>
            <span className="font-medium">{formatCurrency(data.value)}</span>
          </p>
          <p className="text-sm">
            <span className="text-muted-foreground">Percentage: </span>
            <span className="font-medium">{data.percentage.toFixed(1)}%</span>
          </p>
          <p className="text-sm">
            <span className="text-muted-foreground">Holdings: </span>
            <span className="font-medium">{data.count}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = () => (
    <div className="flex flex-wrap gap-2 justify-center mt-4">
      {allocationData.map((item) => (
        <div key={item.category} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded"
            style={{ backgroundColor: categoryColors[item.category] }}
          />
          <span className="text-sm text-muted-foreground">
            {item.category} ({item.percentage.toFixed(1)}%)
          </span>
        </div>
      ))}
    </div>
  );

  if (allocationData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Asset Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>No data available</p>
            <p className="text-sm">Add some holdings to see allocation</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">Asset Allocation</CardTitle>
        <Badge variant="secondary">
          {allocationData.length} {allocationData.length === 1 ? 'Category' : 'Categories'}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ percentage }) => `${percentage.toFixed(1)}%`}
                >
                  {allocationData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={categoryColors[entry.category]} 
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <CustomLegend />

          <div className="grid grid-cols-1 gap-2 text-sm border-t pt-4">
            <div className="font-medium text-muted-foreground mb-2">Breakdown by Category</div>
            {allocationData.map((item) => (
              <div key={item.category} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: categoryColors[item.category] }}
                  />
                  <span className="font-medium">{item.category}</span>
                  <Badge variant="outline" className="text-xs">
                    {item.count} holding{item.count !== 1 ? 's' : ''}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="font-medium">{formatCurrency(item.value)}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.percentage.toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetAllocationChart;