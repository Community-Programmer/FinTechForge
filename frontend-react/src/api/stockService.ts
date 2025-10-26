import axios from "axios";
import NotificationService from '@/components/NotificationService';

const PYTHON_BACKEND_URL =
  import.meta.env.VITE_PYTHON_BACKEND_URL || "http://localhost:8000";

export interface StockQuote {
  symbol: string;
  companyName: string;
  currentPrice: number;
  previousClose: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  currency: string;
  exchange: string;
  sector: string;
  industry: string;
  website: string;
  logo: string;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  timestamp: string;
}

export interface StockHistoryPoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface StockHistory {
  symbol: string;
  period: string;
  interval: string;
  data: StockHistoryPoint[];
}

export interface MultipleStockQuotesResponse {
  data: (StockQuote | { symbol: string; error: string })[];
}

/**\r
 * Get stock quote for a single symbol\r
 */
export const getStockQuote = async (symbol: string): Promise<StockQuote> => {
  try {
    const response = await axios.get(
      `${PYTHON_BACKEND_URL}/api/v1/stocks/quote`,
      {
        params: { symbol },
      }
    );
    return response.data;
  } catch (error) {
    NotificationService.error(`Failed to load data for ${symbol}. Please check the symbol and try again.`);
    throw error;
  }
};

/**\r
 * Get stock quotes for multiple symbols\r
 */
export const getMultipleStockQuotes = async (
  symbols: string[]
): Promise<MultipleStockQuotesResponse> => {
  if (symbols.length === 0) return { data: [] };

  const symbolsString = symbols.join(",");
  try {
    const response = await axios.get(
      `${PYTHON_BACKEND_URL}/api/v1/stocks/quotes`,
      {
        params: { symbols: symbolsString },
      }
    );
    
    // Count successful and failed requests
    const successful = response.data.data.filter(item => !('error' in item)).length;
    const failed = response.data.data.filter(item => 'error' in item).length;
    
    if (failed > 0) {
      NotificationService.warning(`${failed} out of ${symbols.length} symbols failed to load.`);
    } else if (successful > 0) {
      NotificationService.success(`${successful} stock quotes loaded successfully.`);
    }
    
    return response.data;
  } catch (error) {
    NotificationService.error('Failed to load multiple stock quotes. Please try again later.');
    throw error;
  }
};

/**\r
 * Search for stocks\r
 */
export const searchStocks = async (query: string) => {
  try {
    const response = await axios.get(
      `${PYTHON_BACKEND_URL}/api/v1/stocks/search`,
      {
        params: { query },
      }
    );
    return response.data;
  } catch (error) {
    NotificationService.error('Failed to search stocks. Please try again later.');
    throw error;
  }
};

/**\r
 * Get historical stock data\r
 */
export const getStockHistory = async (
  symbol: string,
  period: string = "1mo",
  interval: string = "1d"
): Promise<StockHistory> => {
  try {
    const response = await axios.get(
      `${PYTHON_BACKEND_URL}/api/v1/stocks/history`,
      {
        params: { symbol, period, interval },
      }
    );
    NotificationService.success(`Historical data for ${symbol} loaded successfully.`);
    return response.data;
  } catch (error) {
    NotificationService.error(`Failed to load historical data for ${symbol}. Please try again later.`);
    throw error;
  }
};