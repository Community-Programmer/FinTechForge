import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { loadDemoData, addPerformanceSnapshot } from '@/store/portfolio/portfolioSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  BarChart3,
  Target,
  Clock
} from 'lucide-react';
import PortfolioOverviewCards from '@/components/Portfolio/PortfolioOverviewCards';
import HoldingsTable from '@/components/Portfolio/HoldingsTable';
import PortfolioEmptyState from '@/components/EmptyStates/PortfolioEmptyState';

const Portfolio: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { holdings, summary, performance, loading } = useSelector((state: RootState) => state.portfolio);

  useEffect(() => {
    // Load demo data if no holdings exist
    if (holdings.length === 0) {
      dispatch(loadDemoData());
    }
    
    // Add performance snapshot
    dispatch(addPerformanceSnapshot());
  }, [dispatch, holdings.length]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatPercentage = (percentage: number): string => {
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
          <p className="text-muted-foreground">
            Track your investments and portfolio performance
          </p>
        </div>
        <Button>Add Holding</Button>
      </div>

      {/* Portfolio Overview Cards */}
      <PortfolioOverviewCards />

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(summary.totalValue)}</div>
            <p className="text-xs text-muted-foreground">
              Portfolio market value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Gain/Loss</CardTitle>
            {summary.totalGainLoss >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              summary.totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {formatCurrency(summary.totalGainLoss)}
            </div>
            <p className="text-xs text-muted-foreground">
              <Badge variant={summary.totalGainLossPercentage >= 0 ? 'default' : 'destructive'}>
                {formatPercentage(summary.totalGainLossPercentage)}
              </Badge>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Holdings</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.totalHoldings}</div>
            <p className="text-xs text-muted-foreground">
              Active positions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investment</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(summary.totalInvestment)}</div>
            <p className="text-xs text-muted-foreground">
              Total invested amount
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="allocation">Allocation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Portfolio Performance
                </CardTitle>
                <CardDescription>
                  Your portfolio value over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Performance Chart Coming Soon</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Asset Allocation
                </CardTitle>
                <CardDescription>
                  Breakdown by asset category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Asset Allocation Chart Coming Soon</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Holdings */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Holdings</CardTitle>
              <CardDescription>
                Your top performing assets
              </CardDescription>
            </CardHeader>
            <CardContent>
              {holdings.length > 0 ? (
                <HoldingsTable />
              ) : (
                <div className="min-h-[200px] flex items-center justify-center">
                  <PortfolioEmptyState 
                    title="No Holdings Yet" 
                    subtitle="You don't have any portfolio holdings yet. Start by adding your first investment to track its performance." 
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="holdings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Holdings</CardTitle>
              <CardDescription>
                Manage your portfolio positions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {holdings.length > 0 ? (
                <HoldingsTable />
              ) : (
                <div className="min-h-[300px]">
                  <PortfolioEmptyState 
                    title="No Holdings Yet" 
                    subtitle="You don't have any portfolio holdings yet. Start by adding your first investment to track its performance." 
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Portfolio Performance Analysis
              </CardTitle>
              <CardDescription>
                Detailed performance metrics and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Performance Analysis Chart Coming Soon</p>
              </div>
              
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {formatPercentage(summary.totalGainLossPercentage)}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Return</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {performance.length}
                  </div>
                  <p className="text-sm text-muted-foreground">Days Tracked</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {formatCurrency(summary.totalValue - summary.totalInvestment)}
                  </div>
                  <p className="text-sm text-muted-foreground">Absolute Gain</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allocation" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
                <CardDescription>
                  Distribution by asset type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Asset Allocation Chart Coming Soon</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sector Breakdown</CardTitle>
                <CardDescription>
                  Distribution by market sector
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(
                    holdings
                      .filter(h => h.sector)
                      .reduce((acc, holding) => {
                        const sector = holding.sector || 'Unknown';
                        const value = holding.quantity * (holding.currentPrice || holding.averagePrice);
                        acc[sector] = (acc[sector] || 0) + value;
                        return acc;
                      }, {} as Record<string, number>)
                  )
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 6)
                    .map(([sector, value]) => {
                      const percentage = (value / summary.totalValue) * 100;
                      return (
                        <div key={sector} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{sector}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                              {formatCurrency(value)}
                            </span>
                            <Badge variant="outline">
                              {percentage.toFixed(1)}%
                            </Badge>
                          </div>
                        </div>
                      );
                    })
                  }
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Last Updated */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Last updated: {new Date(summary.lastUpdated).toLocaleString()}
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => dispatch(addPerformanceSnapshot())}
            >
              Refresh Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Portfolio;