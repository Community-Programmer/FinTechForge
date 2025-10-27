import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, FileText, Calendar, Filter, Eye, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  symbol: string;
  type: 'buy' | 'sell';
  shares: number;
  price: number;
  fees: number;
  totalAmount: number;
  gainLoss?: number;
  holdingPeriod?: 'short' | 'long';
}

interface ReportSummary {
  totalTransactions: number;
  totalGains: number;
  totalLosses: number;
  netGainLoss: number;
  shortTermGains: number;
  longTermGains: number;
  estimatedTaxLiability: number;
}

const TaxReports: React.FC = () => {
  const [reportType, setReportType] = useState('year-end-summary');
  const [taxYear, setTaxYear] = useState('2024');
  const [dateFrom, setDateFrom] = useState('2024-01-01');
  const [dateTo, setDateTo] = useState('2024-12-31');
  const [includeUnrealized, setIncludeUnrealized] = useState(false);

  // Sample transaction data
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      date: '2024-01-15',
      symbol: 'AAPL',
      type: 'buy',
      shares: 100,
      price: 150.00,
      fees: 4.95,
      totalAmount: 15004.95
    },
    {
      id: '2',
      date: '2024-10-15',
      symbol: 'AAPL',
      type: 'sell',
      shares: 100,
      price: 180.00,
      fees: 4.95,
      totalAmount: 17995.05,
      gainLoss: 2990.10,
      holdingPeriod: 'long'
    },
    {
      id: '3',
      date: '2024-03-10',
      symbol: 'TSLA',
      type: 'buy',
      shares: 50,
      price: 300.00,
      fees: 4.95,
      totalAmount: 15004.95
    },
    {
      id: '4',
      date: '2024-11-05',
      symbol: 'TSLA',
      type: 'sell',
      shares: 50,
      price: 250.00,
      fees: 4.95,
      totalAmount: 12495.05,
      gainLoss: -2509.90,
      holdingPeriod: 'long'
    },
    {
      id: '5',
      date: '2024-06-20',
      symbol: 'MSFT',
      type: 'buy',
      shares: 80,
      price: 350.00,
      fees: 4.95,
      totalAmount: 28004.95
    },
    {
      id: '6',
      date: '2024-12-01',
      symbol: 'MSFT',
      type: 'sell',
      shares: 40,
      price: 420.00,
      fees: 4.95,
      totalAmount: 16795.05,
      gainLoss: 2795.05,
      holdingPeriod: 'short'
    }
  ]);

  const calculateReportSummary = (): ReportSummary => {
    const sellTransactions = transactions.filter(t => t.type === 'sell' && t.gainLoss !== undefined);
    
    const totalTransactions = transactions.length;
    const totalGains = sellTransactions.filter(t => t.gainLoss! > 0).reduce((sum, t) => sum + t.gainLoss!, 0);
    const totalLosses = sellTransactions.filter(t => t.gainLoss! < 0).reduce((sum, t) => sum + Math.abs(t.gainLoss!), 0);
    const netGainLoss = totalGains - totalLosses;
    
    const shortTermGains = sellTransactions.filter(t => t.holdingPeriod === 'short' && t.gainLoss! > 0).reduce((sum, t) => sum + t.gainLoss!, 0);
    const longTermGains = sellTransactions.filter(t => t.holdingPeriod === 'long' && t.gainLoss! > 0).reduce((sum, t) => sum + t.gainLoss!, 0);
    
    // Simplified tax calculation (using 22% for short-term, 15% for long-term)
    const estimatedTaxLiability = shortTermGains * 0.22 + longTermGains * 0.15;

    return {
      totalTransactions,
      totalGains,
      totalLosses,
      netGainLoss,
      shortTermGains,
      longTermGains,
      estimatedTaxLiability
    };
  };

  const summary = calculateReportSummary();

  const generateCSV = () => {
    const headers = ['Date', 'Symbol', 'Type', 'Shares', 'Price', 'Fees', 'Total Amount', 'Gain/Loss', 'Holding Period'];
    const csvContent = [
      headers.join(','),
      ...transactions.map(t => [
        t.date,
        t.symbol,
        t.type,
        t.shares,
        t.price,
        t.fees,
        t.totalAmount,
        t.gainLoss || '',
        t.holdingPeriod || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tax_report_${taxYear}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const generatePDF = () => {
    // In a real application, this would generate a proper PDF
    alert('PDF generation would be implemented with a library like jsPDF or react-pdf');
  };

  const previewReport = () => {
    // In a real application, this would open a detailed preview
    alert('Report preview would show detailed breakdown of all transactions and calculations');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US');
  };

  return (
    <div className="space-y-6">
      {/* Report Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Report Configuration
          </CardTitle>
          <CardDescription>
            Configure your tax report settings and date range
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="report-type">Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="year-end-summary">Year-End Tax Summary</SelectItem>
                  <SelectItem value="quarterly">Quarterly Report</SelectItem>
                  <SelectItem value="capital-gains">Capital Gains/Losses</SelectItem>
                  <SelectItem value="transaction-history">Transaction History</SelectItem>
                  <SelectItem value="tax-loss-harvesting">Tax Loss Harvesting</SelectItem>
                  <SelectItem value="schedule-d">Schedule D (Form 1040)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tax-year">Tax Year</Label>
              <Select value={taxYear} onValueChange={setTaxYear}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="date-from">From Date</Label>
              <Input
                id="date-from"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date-to">To Date</Label>
              <Input
                id="date-to"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="include-unrealized"
              checked={includeUnrealized}
              onChange={(e) => setIncludeUnrealized(e.target.checked)}
            />
            <Label htmlFor="include-unrealized">Include unrealized gains/losses</Label>
          </div>
        </CardContent>
      </Card>

      {/* Report Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.totalTransactions}</div>
            <p className="text-xs text-muted-foreground">In {taxYear}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Gains</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(summary.totalGains)}
            </div>
            <p className="text-xs text-muted-foreground">
              Realized gains
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Losses</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(summary.totalLosses)}
            </div>
            <p className="text-xs text-muted-foreground">
              Realized losses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Est. Tax Liability</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(summary.estimatedTaxLiability)}
            </div>
            <p className="text-xs text-muted-foreground">
              Based on gains
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Report Actions</CardTitle>
          <CardDescription>
            Generate, preview, or export your tax reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 flex-wrap">
            <Button onClick={previewReport} variant="outline" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview Report
            </Button>
            <Button onClick={generateCSV} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
            <Button onClick={generatePDF} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Advanced Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Transactions
          </CardTitle>
          <CardDescription>
            Preview of transactions included in your report
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Symbol</th>
                    <th className="text-left p-2">Type</th>
                    <th className="text-right p-2">Shares</th>
                    <th className="text-right p-2">Price</th>
                    <th className="text-right p-2">Total</th>
                    <th className="text-right p-2">Gain/Loss</th>
                    <th className="text-center p-2">Period</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.slice(0, 10).map((transaction) => (
                    <tr key={transaction.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 text-sm">{formatDate(transaction.date)}</td>
                      <td className="p-2 font-medium">{transaction.symbol}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          transaction.type === 'buy' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                        }`}>
                          {transaction.type.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-2 text-right">{transaction.shares}</td>
                      <td className="p-2 text-right">{formatCurrency(transaction.price)}</td>
                      <td className="p-2 text-right">{formatCurrency(transaction.totalAmount)}</td>
                      <td className="p-2 text-right">
                        {transaction.gainLoss ? (
                          <span className={transaction.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}>
                            {formatCurrency(transaction.gainLoss)}
                          </span>
                        ) : '-'}
                      </td>
                      <td className="p-2 text-center">
                        {transaction.holdingPeriod ? (
                          <span className={`px-2 py-1 rounded text-xs ${
                            transaction.holdingPeriod === 'long' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {transaction.holdingPeriod}
                          </span>
                        ) : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {transactions.length > 10 && (
              <div className="text-center text-sm text-muted-foreground">
                Showing 10 of {transactions.length} transactions
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tax Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Calculation Breakdown</CardTitle>
          <CardDescription>
            Detailed breakdown of your tax obligations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-medium">Short-term Capital Gains</h4>
              <div className="space-y-2 pl-4 border-l-2 border-yellow-500">
                <div className="flex justify-between text-sm">
                  <span>Gains:</span>
                  <span className="text-green-600">{formatCurrency(summary.shortTermGains)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax Rate:</span>
                  <span>22%</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Tax Owed:</span>
                  <span>{formatCurrency(summary.shortTermGains * 0.22)}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Long-term Capital Gains</h4>
              <div className="space-y-2 pl-4 border-l-2 border-green-500">
                <div className="flex justify-between text-sm">
                  <span>Gains:</span>
                  <span className="text-green-600">{formatCurrency(summary.longTermGains)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax Rate:</span>
                  <span>15%</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Tax Owed:</span>
                  <span>{formatCurrency(summary.longTermGains * 0.15)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total Estimated Tax Liability:</span>
              <span className="text-primary">{formatCurrency(summary.estimatedTaxLiability)}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              This is an estimate. Consult with a tax professional for accurate calculations.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxReports;