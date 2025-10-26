import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  X,
  Plus,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Loader2,
  Download,
} from "lucide-react";
import { getMultipleStockQuotes, StockQuote, MultipleStockQuotesResponse } from "@/api/stockService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Papa from 'papaparse';

const STORAGE_KEY = "stock_watchlist";

const StockWatchlist = () => {
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [stocks, setStocks] = useState<StockQuote[]>([]);
  const [loading, setLoading] = useState(false);
  const [newSymbol, setNewSymbol] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  // Load watchlist from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const symbols = JSON.parse(saved);
      // Only set watchlist if it has items, otherwise add defaults
      if (symbols && symbols.length > 0) {
        setWatchlist(symbols);
      } else {
        // Default watchlist
        const defaultSymbols = ["AAPL", "MSFT", "GOOGL"];
        setWatchlist(defaultSymbols);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSymbols));
      }
    } else {
      // Default watchlist
      const defaultSymbols = ["AAPL", "MSFT", "GOOGL"];
      setWatchlist(defaultSymbols);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSymbols));
    }
  }, []);

  const fetchStockData = useCallback(async () => {
    if (watchlist.length === 0) return;

    setLoading(true);
    try {
      const response: MultipleStockQuotesResponse = await getMultipleStockQuotes(watchlist);
      const successfulStocks = response.data.filter((stock): stock is StockQuote => !('error' in stock));
      const failedStocks = response.data.filter((stock): stock is { symbol: string; error: string } => 'error' in stock);
      
      setStocks(successfulStocks);
      
      // Provide feedback for failed stocks
      if (failedStocks.length > 0) {
        const failedSymbols = failedStocks.map(stock => stock.symbol).join(', ');
        toast.error(`Failed to load data for: ${failedSymbols}`, {
          duration: 5000,
        });
      }
      
      // Provide feedback if all stocks failed
      if (successfulStocks.length === 0 && failedStocks.length > 0) {
        toast.error('No stock data could be loaded. Please check the symbols and try again.', {
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error fetching stock data:", error);
      toast.error('Failed to fetch stock data. Please try again later.', {
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  }, [watchlist]);

  // Fetch stock data whenever watchlist changes
  useEffect(() => {
    fetchStockData();
  }, [fetchStockData]);

  const addStock = () => {
    const symbol = newSymbol.trim().toUpperCase();
    if (symbol && !watchlist.includes(symbol)) {
      const updated = [...watchlist, symbol];
      setWatchlist(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setNewSymbol("");
      setIsDialogOpen(false);
    }
  };

  const removeStock = (symbol: string) => {
    const updated = watchlist.filter((s) => s !== symbol);
    setWatchlist(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatChange = (change: number, changePercent: number) => {
    const sign = change >= 0 ? "+" : "";
    return `${sign}${change.toFixed(2)} (${sign}${changePercent.toFixed(2)}%)`;
  };

  const handleStockClick = (symbol: string) => {
    navigate(`/dashboard/analysis?symbol=${symbol}`);
  };

  const exportToCSV = () => {
    if (stocks.length === 0) {
      toast.error('No stock data available to export.');
      return;
    }

    // Prepare CSV data with headers
    const csvHeaders = [
      'Symbol',
      'Company Name', 
      'Current Price',
      'Previous Close',
      'Change',
      'Change %',
      'Volume',
      'Market Cap',
      'Currency',
      'Exchange',
      'Sector',
      'Industry',
      'Website',
      '52 Week High',
      '52 Week Low'
    ];

    // Prepare the data rows
    const csvData = stocks.map(stock => [
      stock.symbol,
      stock.companyName,
      stock.currentPrice,
      stock.previousClose,
      stock.change,
      stock.changePercent,
      stock.volume,
      stock.marketCap,
      stock.currency,
      stock.exchange,
      stock.sector,
      stock.industry,
      stock.website,
      stock.fiftyTwoWeekHigh,
      stock.fiftyTwoWeekLow
    ]);

    // Convert to CSV format
    const csv = Papa.unparse({
      fields: csvHeaders,
      data: csvData
    });

    // Create a Blob and download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `stock-watchlist-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Watchlist exported to CSV successfully!');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Stock Watchlist
            </CardTitle>
            <CardDescription>
              Track your favorite stocks in real-time
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              className="gap-2"
              onClick={exportToCSV}
              variant="outline"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Stock
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Stock to Watchlist</DialogTitle>
                  <DialogDescription>
                    Enter a stock symbol (e.g., AAPL, TSLA, MSFT)
                  </DialogDescription>
                </DialogHeader>
                <div className="flex gap-2">
                  <Input
                    placeholder="Stock symbol"
                    value={newSymbol}
                    onChange={(e) => setNewSymbol(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addStock()}
                  />
                  <Button onClick={addStock}>Add</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : stocks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No stocks in watchlist. Add some stocks to get started!
          </div>
        ) : (
          <div className="space-y-2">
            {stocks.map((stock) => (
              <div
                key={stock.symbol}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent cursor-pointer transition-colors"
                onClick={() => handleStockClick(stock.symbol)}
              >
                <div className="flex items-center gap-3 flex-1">
                  {stock.logo && (
                    <img
                      src={stock.logo}
                      alt={stock.symbol}
                      className="w-10 h-10 rounded-full"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                  <div className="flex-1">
                    <div className="font-semibold">{stock.symbol}</div>
                    <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                      {stock.companyName}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-semibold">
                      {formatPrice(stock.currentPrice)}
                    </div>
                    <div
                      className={`text-sm flex items-center gap-1 ${
                        stock.change >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stock.change >= 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {formatChange(stock.change, stock.changePercent)}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeStock(stock.symbol);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StockWatchlist;