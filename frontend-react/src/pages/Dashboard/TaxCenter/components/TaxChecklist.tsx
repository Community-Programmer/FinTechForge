import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertTriangle,
  Target,
  FileText,
  DollarSign,
  Calculator,
  Archive
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: 'documents' | 'deductions' | 'investments' | 'planning' | 'compliance';
  priority: 'high' | 'medium' | 'low';
  deadline: string;
  estimated_time: string;
  potential_savings?: number;
  completed: boolean;
  dependencies?: string[];
  resources?: string[];
}

interface ChecklistCategory {
  id: string;
  name: string;
  description: string;
  items: ChecklistItem[];
  completion_percentage: number;
}

const TaxChecklist: React.FC = () => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    {
      id: '1',
      title: 'Gather W-2 Forms',
      description: 'Collect W-2 forms from all employers for the tax year',
      category: 'documents',
      priority: 'high',
      deadline: '2025-01-31',
      estimated_time: '15 minutes',
      completed: false,
      dependencies: [],
      resources: ['Employer HR department', 'ADP/Payroll portal']
    },
    {
      id: '2',
      title: 'Collect 1099 Forms',
      description: 'Gather all 1099 forms (1099-INT, 1099-DIV, 1099-B, etc.)',
      category: 'documents',
      priority: 'high',
      deadline: '2025-01-31',
      estimated_time: '30 minutes',
      completed: false,
      dependencies: [],
      resources: ['Investment brokers', 'Banks', 'Freelance clients']
    },
    {
      id: '3',
      title: 'Organize Charitable Donation Receipts',
      description: 'Compile receipts and acknowledgment letters for charitable contributions',
      category: 'deductions',
      priority: 'medium',
      deadline: '2025-04-15',
      estimated_time: '45 minutes',
      potential_savings: 550,
      completed: false,
      dependencies: [],
      resources: ['Donation receipts', 'Charity acknowledgment letters']
    },
    {
      id: '4',
      title: 'Calculate Home Office Deduction',
      description: 'Measure and calculate home office expenses if you work from home',
      category: 'deductions',
      priority: 'medium',
      deadline: '2025-04-15',
      estimated_time: '1 hour',
      potential_savings: 1200,
      completed: false,
      dependencies: [],
      resources: ['Home office measurements', 'Utility bills', 'Mortgage/rent statements']
    },
    {
      id: '5',
      title: 'Review Investment Losses',
      description: 'Identify investment losses for tax-loss harvesting opportunities',
      category: 'investments',
      priority: 'high',
      deadline: '2024-12-31',
      estimated_time: '2 hours',
      potential_savings: 2500,
      completed: false,
      dependencies: [],
      resources: ['Brokerage statements', 'Investment tracking app']
    },
    {
      id: '6',
      title: 'Maximize Retirement Contributions',
      description: 'Ensure maximum contributions to 401(k), IRA, and other retirement accounts',
      category: 'planning',
      priority: 'high',
      deadline: '2024-12-31',
      estimated_time: '30 minutes',
      potential_savings: 4600,
      completed: false,
      dependencies: [],
      resources: ['HR department', 'Retirement account providers']
    },
    {
      id: '7',
      title: 'Organize Medical Expenses',
      description: 'Collect medical, dental, and prescription receipts for itemized deductions',
      category: 'deductions',
      priority: 'low',
      deadline: '2025-04-15',
      estimated_time: '1 hour',
      potential_savings: 800,
      completed: false,
      dependencies: [],
      resources: ['Medical receipts', 'Insurance statements', 'HSA records']
    },
    {
      id: '8',
      title: 'Update Tax Withholdings',
      description: 'Review and adjust tax withholdings for the upcoming year',
      category: 'planning',
      priority: 'medium',
      deadline: '2025-02-28',
      estimated_time: '45 minutes',
      completed: false,
      dependencies: ['Complete current year tax return'],
      resources: ['W-4 form', 'IRS withholding calculator']
    },
    {
      id: '9',
      title: 'File Extension if Needed',
      description: 'File Form 4868 for automatic 6-month extension if you need more time',
      category: 'compliance',
      priority: 'high',
      deadline: '2025-04-15',
      estimated_time: '15 minutes',
      completed: false,
      dependencies: ['Estimate tax liability'],
      resources: ['IRS Form 4868', 'Tax software']
    },
    {
      id: '10',
      title: 'Plan Next Year\'s Tax Strategy',
      description: 'Review this year\'s tax situation and plan strategies for next year',
      category: 'planning',
      priority: 'medium',
      deadline: '2025-05-15',
      estimated_time: '2 hours',
      completed: false,
      dependencies: ['Complete current year tax return'],
      resources: ['Tax professional', 'Financial advisor']
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleItemCompletion = (itemId: string) => {
    setChecklist(prevChecklist =>
      prevChecklist.map(item =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const categories: ChecklistCategory[] = [
    {
      id: 'documents',
      name: 'Documents & Records',
      description: 'Gather all necessary tax documents and records',
      items: checklist.filter(item => item.category === 'documents'),
      completion_percentage: 0
    },
    {
      id: 'deductions',
      name: 'Deductions & Credits',
      description: 'Identify and organize all possible deductions and credits',
      items: checklist.filter(item => item.category === 'deductions'),
      completion_percentage: 0
    },
    {
      id: 'investments',
      name: 'Investment Activities',
      description: 'Review investment gains, losses, and optimization opportunities',
      items: checklist.filter(item => item.category === 'investments'),
      completion_percentage: 0
    },
    {
      id: 'planning',
      name: 'Tax Planning',
      description: 'Strategic planning for current and future tax years',
      items: checklist.filter(item => item.category === 'planning'),
      completion_percentage: 0
    },
    {
      id: 'compliance',
      name: 'Filing & Compliance',
      description: 'File returns and meet all compliance requirements',
      items: checklist.filter(item => item.category === 'compliance'),
      completion_percentage: 0
    }
  ];

  // Calculate completion percentages
  categories.forEach(category => {
    const completedItems = category.items.filter(item => item.completed).length;
    category.completion_percentage = category.items.length > 0 
      ? Math.round((completedItems / category.items.length) * 100) 
      : 0;
  });

  const filteredItems = selectedCategory === 'all' 
    ? checklist 
    : checklist.filter(item => item.category === selectedCategory);

  const totalItems = checklist.length;
  const completedItems = checklist.filter(item => item.completed).length;
  const overallProgress = Math.round((completedItems / totalItems) * 100);
  const totalPotentialSavings = checklist
    .filter(item => item.potential_savings && !item.completed)
    .reduce((sum, item) => sum + (item.potential_savings || 0), 0);

  const getUrgencyColor = (deadline: string, priority: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntil < 0) return 'text-red-600 font-semibold'; // Overdue
    if (daysUntil <= 7 && priority === 'high') return 'text-red-600';
    if (daysUntil <= 30 && priority === 'high') return 'text-orange-600';
    if (priority === 'high') return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'documents': return <FileText className="h-4 w-4" />;
      case 'deductions': return <DollarSign className="h-4 w-4" />;
      case 'investments': return <Calculator className="h-4 w-4" />;
      case 'planning': return <Target className="h-4 w-4" />;
      case 'compliance': return <Archive className="h-4 w-4" />;
      default: return <CheckCircle2 className="h-4 w-4" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallProgress}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {completedItems} of {totalItems} items completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Potential Savings</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(totalPotentialSavings)}
            </div>
            <p className="text-xs text-muted-foreground">
              From incomplete high-value items
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Urgent Items</CardTitle>
            <Clock className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {checklist.filter(item => {
                const deadline = new Date(item.deadline);
                const today = new Date();
                const daysUntil = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                return daysUntil <= 30 && !item.completed && item.priority === 'high';
              }).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Due within 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Category Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Progress by Category</CardTitle>
          <CardDescription>Track your completion progress across different tax preparation areas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div 
                key={category.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedCategory === category.id ? 'border-primary bg-primary/5' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="flex items-center gap-2 mb-2">
                  {getCategoryIcon(category.id)}
                  <h3 className="font-medium">{category.name}</h3>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${category.completion_percentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{category.completion_percentage}% complete</span>
                  <span>{category.items.length} items</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Filter by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
            >
              All Items ({checklist.length})
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                {getCategoryIcon(category.id)}
                {category.name} ({category.items.length})
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Checklist Items */}
      <div className="space-y-3">
        {filteredItems
          .sort((a, b) => {
            // Sort by completion status (incomplete first), then by deadline, then by priority
            if (a.completed !== b.completed) return a.completed ? 1 : -1;
            if (a.deadline !== b.deadline) return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
            const priorityOrder = { high: 1, medium: 2, low: 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
          })
          .map((item) => (
          <Card key={item.id} className={`transition-all duration-200 ${item.completed ? 'opacity-60' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleItemCompletion(item.id)}
                  className="mt-1 transition-colors hover:scale-110"
                >
                  {item.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className={`font-medium ${item.completed ? 'line-through text-gray-500' : ''}`}>
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    </div>
                    <div className="text-right space-y-1">
                      {item.potential_savings && (
                        <div className="text-sm font-medium text-green-600">
                          {formatCurrency(item.potential_savings)} savings
                        </div>
                      )}
                      <div className={`text-sm ${getUrgencyColor(item.deadline, item.priority)}`}>
                        {formatDate(item.deadline)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className={getPriorityColor(item.priority)}>
                      {item.priority} priority
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.estimated_time}
                    </Badge>
                    {item.dependencies && item.dependencies.length > 0 && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        {item.dependencies.length} dependencies
                      </Badge>
                    )}
                  </div>

                  {item.resources && item.resources.length > 0 && (
                    <div className="mt-3">
                      <div className="text-xs font-medium text-muted-foreground mb-1">Resources:</div>
                      <div className="text-xs text-muted-foreground">
                        {item.resources.join(' • ')}
                      </div>
                    </div>
                  )}

                  {item.dependencies && item.dependencies.length > 0 && (
                    <div className="mt-2">
                      <div className="text-xs font-medium text-muted-foreground mb-1">Dependencies:</div>
                      <div className="text-xs text-muted-foreground">
                        {item.dependencies.join(' • ')}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <CheckCircle2 className="h-12 w-12 mx-auto text-green-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">All items in this category completed!</h3>
            <p className="text-muted-foreground">Great job staying on top of your tax preparation.</p>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => {
                const incomplete = checklist.filter(item => !item.completed);
                incomplete.forEach(item => toggleItemCompletion(item.id));
              }}
            >
              <CheckCircle2 className="h-4 w-4" />
              Mark All Complete
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => {
                setSelectedCategory('all');
                // Focus on urgent items - could implement filtering here
              }}
            >
              <Clock className="h-4 w-4" />
              Show Urgent Only
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => {
                // Export checklist functionality
                alert('Export checklist functionality would be implemented here');
              }}
            >
              <FileText className="h-4 w-4" />
              Export Checklist
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => {
                // Print checklist functionality
                window.print();
              }}
            >
              <Archive className="h-4 w-4" />
              Print Checklist
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxChecklist;