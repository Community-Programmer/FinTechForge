import axios from "axios";

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
  const response = await axios.get(
    `${PYTHON_BACKEND_URL}/api/v1/stocks/quote`,
    {
      params: { symbol },
    }
  );
  return response.data;
};

/**\r
 * Get stock quotes for multiple symbols\r
 */
export const getMultipleStockQuotes = async (
  symbols: string[]
): Promise<MultipleStockQuotesResponse> => {
  if (symbols.length === 0) return { data: [] };

  const symbolsString = symbols.join(",");
  const response = await axios.get(
    `${PYTHON_BACKEND_URL}/api/v1/stocks/quotes`,
    {
      params: { symbols: symbolsString },
    }
  );
  return response.data;
};

/**\r
 * Search for stocks\r
 */
export const searchStocks = async (query: string) => {
  const response = await axios.get(
    `${PYTHON_BACKEND_URL}/api/v1/stocks/search`,
    {
      params: { query },
    }
  );
  return response.data;
};

/**\r
 * Get historical stock data\r
 */
export const getStockHistory = async (
  symbol: string,
  period: string = "1mo",
  interval: string = "1d"
): Promise<StockHistory> => {
  const response = await axios.get(
    `${PYTHON_BACKEND_URL}/api/v1/stocks/history`,
    {
      params: { symbol, period, interval },
    }
  );
  return response.data;
};