import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
// import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Shield, 
  PiggyBank, 
  Target, 
  CheckCircle, 
  AlertCircle,
  Lightbulb,
  Calendar,
  DollarSign,
  BarChart3
} from 'lucide-react';

interface Strategy {
  id: string;
  title: string;
  category: 'retirement' | 'investment' | 'deductions' | 'timing';
  description: string;
  potential_savings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  timeline: string;
  implementation_steps: string[];
  requirements: string[];
  tax_impact: string;
  applicable: boolean;
  priority: number;
}

interface PortfolioAllocation {
  account_type: string;
  current_allocation: number;
  recommended_allocation: number;
  tax_efficiency_score: number;
  suggestions: string[];
}

const TaxStrategies: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [userProfile] = useState({
    annual_income: 120000,
    tax_bracket: 22,
    age: 35,
    retirement_contributions: 15000,
    has_401k: true,
    has_ira: true,
    has_hsa: false,
    investment_timeline: 'long_term'
  });

  const strategies: Strategy[] = [
    {
      id: '1',
      title: 'Maximize 401(k) Contributions',
      category: 'retirement',
      description: 'Increase your 401(k) contributions to reduce current taxable income while building retirement wealth.',
      potential_savings: 4620, // 22% of additional $21,000 (assuming currently at $15k, max is $23k)
      difficulty: 'easy',
      timeline: 'Immediate',
      implementation_steps: [
        'Contact HR or payroll department',
        'Increase contribution percentage',
        'Consider catch-up contributions if 50+'
      ],
      requirements: ['Employer-sponsored 401(k) plan', 'Sufficient income'],
      tax_impact: 'Immediate deduction from current year income',
      applicable: userProfile.has_401k && userProfile.retirement_contributions < 23000,
      priority: 1
    },
    {
      id: '2',
      title: 'Open and Fund HSA',
      category: 'retirement',
      description: 'Health Savings Accounts offer triple tax benefits: deductible contributions, tax-free growth, and tax-free withdrawals for medical expenses.',
      potential_savings: 968, // 22% of $4,400 (2024 individual limit)
      difficulty: 'easy',
      timeline: '1-2 weeks',
      implementation_steps: [
        'Verify eligibility with High-Deductible Health Plan',
        'Open HSA account with reputable provider',
        'Set up automatic contributions',
        'Invest HSA funds for long-term growth'
      ],
      requirements: ['High-Deductible Health Plan (HDHP)', 'No other health coverage'],
      tax_impact: 'Current year deduction + tax-free growth + tax-free medical withdrawals',
      applicable: !userProfile.has_hsa && userProfile.annual_income > 50000,
      priority: 2
    },
    {
      id: '3',
      title: 'Tax-Loss Harvesting Strategy',
      category: 'investment',
      description: 'Systematically realize losses to offset capital gains and reduce tax liability.',
      potential_savings: 1650, // Estimated based on portfolio volatility
      difficulty: 'medium',
      timeline: 'Ongoing',
      implementation_steps: [
        'Review portfolio for unrealized losses',
        'Identify securities to sell',
        'Reinvest in similar but not substantially identical securities',
        'Track wash sale rules (30-day period)'
      ],
      requirements: ['Taxable investment account', 'Portfolio with some losses'],
      tax_impact: 'Offsets up to $3,000 of ordinary income annually, excess carries forward',
      applicable: true,
      priority: 3
    },
    {
      id: '4',
      title: 'Asset Location Optimization',
      category: 'investment',
      description: 'Place tax-inefficient investments in tax-advantaged accounts and tax-efficient investments in taxable accounts.',
      potential_savings: 2200,
      difficulty: 'medium',
      timeline: '1-3 months',
      implementation_steps: [
        'Analyze current asset allocation across account types',
        'Identify tax-inefficient assets (bonds, REITs, high-turnover funds)',
        'Move tax-inefficient assets to retirement accounts',
        'Place tax-efficient assets (index funds, individual stocks) in taxable accounts'
      ],
      requirements: ['Multiple account types', 'Diversified portfolio'],
      tax_impact: 'Reduces annual taxable income from investments',
      applicable: userProfile.has_401k || userProfile.has_ira,
      priority: 4
    },
    {
      id: '5',
      title: 'Roth IRA Conversion Strategy',
      category: 'retirement',
      description: 'Convert traditional IRA funds to Roth IRA during lower-income years to pay taxes at a lower rate.',
      potential_savings: 3300,
      difficulty: 'hard',
      timeline: 'Annual decision',
      implementation_steps: [
        'Analyze current vs. expected future tax rates',
        'Determine optimal conversion amount',
        'Execute partial Roth conversions',
        'Pay taxes from non-retirement funds',
        'Monitor tax bracket implications'
      ],
      requirements: ['Traditional IRA with funds', 'Cash available for tax payments'],
      tax_impact: 'Pay current taxes to avoid higher future taxes',
      applicable: userProfile.has_ira && userProfile.age < 50,
      priority: 5
    },
    {
      id: '6',
      title: 'Charitable Giving Strategies',
      category: 'deductions',
      description: 'Maximize tax benefits through strategic charitable giving, including bunching donations and using appreciated securities.',
      potential_savings: 1540,
      difficulty: 'medium',
      timeline: 'Before year-end',
      implementation_steps: [
        'Identify charitable organizations',
        'Consider bunching donations in alternate years',
        'Donate appreciated securities instead of cash',
        'Explore donor-advised funds for flexibility',
        'Keep detailed records for deductions'
      ],
      requirements: ['Charitable intent', 'Itemized deductions beneficial'],
      tax_impact: 'Itemized deduction up to 60% of AGI for cash, 30% for appreciated property',
      applicable: userProfile.annual_income > 80000,
      priority: 6
    },
    {
      id: '7',
      title: 'Timing Capital Gains and Losses',
      category: 'timing',
      description: 'Strategically time the realization of capital gains and losses to optimize tax outcomes.',
      potential_savings: 880,
      difficulty: 'medium',
      timeline: 'November-December',
      implementation_steps: [
        'Review year-to-date realized gains and losses',
        'Identify opportunities to realize additional losses',
        'Consider deferring gains to next year if beneficial',
        'Plan for wash sale rules',
        'Execute transactions before year-end'
      ],
      requirements: ['Taxable investment accounts', 'Unrealized gains/losses'],
      tax_impact: 'Optimizes current year tax liability',
      applicable: true,
      priority: 7
    }
  ];

  const portfolioAllocations: PortfolioAllocation[] = [
    {
      account_type: '401(k)',
      current_allocation: 60,
      recommended_allocation: 70,
      tax_efficiency_score: 85,
      suggestions: ['Move bond funds here', 'Consider target-date funds']
    },
    {
      account_type: 'Taxable Account',
      current_allocation: 25,
      recommended_allocation: 20,
      tax_efficiency_score: 72,
      suggestions: ['Focus on tax-efficient index funds', 'Hold individual stocks for long-term']
    },
    {
      account_type: 'Roth IRA',
      current_allocation: 15,
      recommended_allocation: 10,
      tax_efficiency_score: 90,
      suggestions: ['High-growth investments', 'International funds']
    }
  ];

  const filteredStrategies = selectedCategory === 'all' 
    ? strategies.filter(s => s.applicable)
    : strategies.filter(s => s.category === selectedCategory && s.applicable);

  const totalPotentialSavings = filteredStrategies.reduce((sum, strategy) => sum + strategy.potential_savings, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'retirement': return <PiggyBank className="h-4 w-4" />;
      case 'investment': return <TrendingUp className="h-4 w-4" />;
      case 'deductions': return <Shield className="h-4 w-4" />;
      case 'timing': return <Calendar className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Potential Annual Savings</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(totalPotentialSavings)}
            </div>
            <p className="text-xs text-muted-foreground">
              From {filteredStrategies.length} applicable strategies
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Tax Bracket</CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userProfile.tax_bracket}%</div>
            <p className="text-xs text-muted-foreground">
              Based on {formatCurrency(userProfile.annual_income)} income
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Strategies Available</CardTitle>
            <Lightbulb className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredStrategies.length}</div>
            <p className="text-xs text-muted-foreground">
              Personalized recommendations
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Strategy Categories</CardTitle>
          <CardDescription>Filter strategies by type to focus on specific areas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
            >
              All Strategies
            </Button>
            <Button
              variant={selectedCategory === 'retirement' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('retirement')}
              className="flex items-center gap-2"
            >
              <PiggyBank className="h-4 w-4" />
              Retirement
            </Button>
            <Button
              variant={selectedCategory === 'investment' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('investment')}
              className="flex items-center gap-2"
            >
              <TrendingUp className="h-4 w-4" />
              Investment
            </Button>
            <Button
              variant={selectedCategory === 'deductions' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('deductions')}
              className="flex items-center gap-2"
            >
              <Shield className="h-4 w-4" />
              Deductions
            </Button>
            <Button
              variant={selectedCategory === 'timing' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('timing')}
              className="flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Timing
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Optimization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Asset Location Optimization
          </CardTitle>
          <CardDescription>
            Optimize your portfolio allocation across account types for maximum tax efficiency
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {portfolioAllocations.map((allocation) => (
              <div key={allocation.account_type} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{allocation.account_type}</span>
                  <span className="text-sm text-muted-foreground">
                    Tax Efficiency: {allocation.tax_efficiency_score}%
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Current: {allocation.current_allocation}%</span>
                      <span>Recommended: {allocation.recommended_allocation}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${allocation.current_allocation}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {allocation.current_allocation > allocation.recommended_allocation ? 'Reduce' : 'Increase'}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Suggestions: {allocation.suggestions.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Strategies List */}
      <div className="space-y-4">
        {filteredStrategies
          .sort((a, b) => a.priority - b.priority)
          .map((strategy) => (
          <Card key={strategy.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    {getCategoryIcon(strategy.category)}
                    {strategy.title}
                  </CardTitle>
                  <CardDescription>{strategy.description}</CardDescription>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-lg font-bold text-green-600">
                    {formatCurrency(strategy.potential_savings)}
                  </div>
                  <div className="text-sm text-muted-foreground">Annual Savings</div>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary" className={getDifficultyColor(strategy.difficulty)}>
                  {strategy.difficulty}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {strategy.timeline}
                </Badge>
                <Badge variant="outline">
                  Priority #{strategy.priority}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Implementation Steps
                </h4>
                <ul className="space-y-1 ml-6">
                  {strategy.implementation_steps.map((step, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-xs font-medium text-primary mt-0.5">{index + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    Requirements
                  </h4>
                  <ul className="space-y-1">
                    {strategy.requirements.map((req, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        • {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    Tax Impact
                  </h4>
                  <p className="text-sm text-muted-foreground">{strategy.tax_impact}</p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button size="sm" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Start Implementation
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStrategies.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Lightbulb className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No strategies available</h3>
            <p className="text-muted-foreground">
              Try selecting a different category or update your profile information.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TaxStrategies;