// Portfolio TypeScript interfaces and types

export interface Holding {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  averagePrice: number;
  currentPrice?: number;
  category: AssetCategory;
  sector?: string;
  dateAdded: string;
  lastUpdated: string;
}

export interface Transaction {
  id: string;
  holdingId: string;
  type: TransactionType;
  quantity: number;
  price: number;
  date: string;
  fees?: number;
  notes?: string;
}

export interface PortfolioSummary {
  totalValue: number;
  totalInvestment: number;
  totalGainLoss: number;
  totalGainLossPercentage: number;
  dayGainLoss: number;
  dayGainLossPercentage: number;
  totalHoldings: number;
  lastUpdated: string;
}

export interface PortfolioPerformance {
  date: string;
  totalValue: number;
  totalInvestment: number;
  gainLoss: number;
  gainLossPercentage: number;
}

export interface AssetAllocation {
  category: AssetCategory;
  value: number;
  percentage: number;
  count: number;
}

export interface SectorAllocation {
  sector: string;
  value: number;
  percentage: number;
  count: number;
}

export enum AssetCategory {
  STOCKS = 'Stocks',
  CRYPTO = 'Crypto',
  BONDS = 'Bonds',
  ETF = 'ETF',
  MUTUAL_FUND = 'Mutual Fund',
  REAL_ESTATE = 'Real Estate',
  COMMODITIES = 'Commodities',
  CASH = 'Cash',
  OTHER = 'Other'
}

export enum TransactionType {
  BUY = 'BUY',
  SELL = 'SELL',
  DIVIDEND = 'DIVIDEND',
  SPLIT = 'SPLIT',
  MERGE = 'MERGE'
}

export interface PortfolioState {
  holdings: Holding[];
  transactions: Transaction[];
  summary: PortfolioSummary;
  performance: PortfolioPerformance[];
  loading: boolean;
  error: string | null;
}

export interface AddHoldingFormData {
  symbol: string;
  name: string;
  quantity: number;
  averagePrice: number;
  category: AssetCategory;
  sector?: string;
  dateAdded: string;
}

export interface EditHoldingFormData extends AddHoldingFormData {
  id: string;
}

// Market data interfaces for real-time price updates
export interface MarketPrice {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  lastUpdated: string;
}

// Portfolio analytics interfaces
export interface PortfolioMetrics {
  totalReturn: number;
  totalReturnPercent: number;
  annualizedReturn: number;
  sharpeRatio?: number;
  maxDrawdown?: number;
  volatility?: number;
  bestPerformingHolding: Holding;
  worstPerformingHolding: Holding;
}

// Utility type for form validation
export type PortfolioFormErrors = {
  [K in keyof AddHoldingFormData]?: string;
};

export default {
  AssetCategory,
  TransactionType
};