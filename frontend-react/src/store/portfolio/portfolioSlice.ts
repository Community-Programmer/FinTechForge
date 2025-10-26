import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
  PortfolioState, 
  Holding, 
  Transaction, 
  PortfolioSummary, 
  PortfolioPerformance,
  AddHoldingFormData,
  AssetCategory,
  TransactionType
} from '@/types/portfolio';

const initialState: PortfolioState = {
  holdings: [],
  transactions: [],
  summary: {
    totalValue: 0,
    totalInvestment: 0,
    totalGainLoss: 0,
    totalGainLossPercentage: 0,
    dayGainLoss: 0,
    dayGainLossPercentage: 0,
    totalHoldings: 0,
    lastUpdated: new Date().toISOString()
  },
  performance: [],
  loading: false,
  error: null
};

// Utility functions for calculations
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const calculateHoldingValue = (holding: Holding): number => {
  return holding.quantity * (holding.currentPrice || holding.averagePrice);
};

const calculateHoldingGainLoss = (holding: Holding): number => {
  const currentPrice = holding.currentPrice || holding.averagePrice;
  return (currentPrice - holding.averagePrice) * holding.quantity;
};

const calculatePortfolioSummary = (holdings: Holding[]): PortfolioSummary => {
  let totalValue = 0;
  let totalInvestment = 0;
  
  holdings.forEach(holding => {
    totalValue += calculateHoldingValue(holding);
    totalInvestment += holding.averagePrice * holding.quantity;
  });

  const totalGainLoss = totalValue - totalInvestment;
  const totalGainLossPercentage = totalInvestment > 0 ? (totalGainLoss / totalInvestment) * 100 : 0;

  return {
    totalValue,
    totalInvestment,
    totalGainLoss,
    totalGainLossPercentage,
    dayGainLoss: 0, // Would need market data for daily change
    dayGainLossPercentage: 0,
    totalHoldings: holdings.length,
    lastUpdated: new Date().toISOString()
  };
};

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    // Loading states
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Holdings management
    addHolding: (state, action: PayloadAction<AddHoldingFormData>) => {
      const newHolding: Holding = {
        id: generateId(),
        ...action.payload,
        currentPrice: action.payload.averagePrice, // Initialize with average price
        lastUpdated: new Date().toISOString()
      };
      
      state.holdings.push(newHolding);
      
      // Add corresponding buy transaction
      const buyTransaction: Transaction = {
        id: generateId(),
        holdingId: newHolding.id,
        type: TransactionType.BUY,
        quantity: newHolding.quantity,
        price: newHolding.averagePrice,
        date: newHolding.dateAdded,
        notes: 'Initial purchase'
      };
      
      state.transactions.push(buyTransaction);
      state.summary = calculatePortfolioSummary(state.holdings);
    },

    updateHolding: (state, action: PayloadAction<Partial<Holding> & { id: string }>) => {
      const index = state.holdings.findIndex(h => h.id === action.payload.id);
      if (index !== -1) {
        state.holdings[index] = {
          ...state.holdings[index],
          ...action.payload,
          lastUpdated: new Date().toISOString()
        };
        state.summary = calculatePortfolioSummary(state.holdings);
      }
    },

    updateHoldingPrice: (state, action: PayloadAction<{ symbol: string; price: number }>) => {
      state.holdings.forEach(holding => {
        if (holding.symbol === action.payload.symbol) {
          holding.currentPrice = action.payload.price;
          holding.lastUpdated = new Date().toISOString();
        }
      });
      state.summary = calculatePortfolioSummary(state.holdings);
    },

    removeHolding: (state, action: PayloadAction<string>) => {
      state.holdings = state.holdings.filter(h => h.id !== action.payload);
      state.transactions = state.transactions.filter(t => t.holdingId !== action.payload);
      state.summary = calculatePortfolioSummary(state.holdings);
    },

    // Bulk operations
    setHoldings: (state, action: PayloadAction<Holding[]>) => {
      state.holdings = action.payload;
      state.summary = calculatePortfolioSummary(state.holdings);
    },

    // Transactions
    addTransaction: (state, action: PayloadAction<Omit<Transaction, 'id'>>) => {
      const newTransaction: Transaction = {
        id: generateId(),
        ...action.payload
      };
      state.transactions.push(newTransaction);

      // Update holding quantity based on transaction
      const holding = state.holdings.find(h => h.id === newTransaction.holdingId);
      if (holding) {
        if (newTransaction.type === TransactionType.BUY) {
          const totalValue = (holding.quantity * holding.averagePrice) + (newTransaction.quantity * newTransaction.price);
          const totalQuantity = holding.quantity + newTransaction.quantity;
          holding.averagePrice = totalValue / totalQuantity;
          holding.quantity = totalQuantity;
        } else if (newTransaction.type === TransactionType.SELL) {
          holding.quantity = Math.max(0, holding.quantity - newTransaction.quantity);
        }
        holding.lastUpdated = new Date().toISOString();
      }
      
      state.summary = calculatePortfolioSummary(state.holdings);
    },

    // Performance tracking
    addPerformanceSnapshot: (state) => {
      const snapshot: PortfolioPerformance = {
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
        totalValue: state.summary.totalValue,
        totalInvestment: state.summary.totalInvestment,
        gainLoss: state.summary.totalGainLoss,
        gainLossPercentage: state.summary.totalGainLossPercentage
      };
      
      // Remove existing snapshot for today if it exists
      state.performance = state.performance.filter(p => p.date !== snapshot.date);
      state.performance.push(snapshot);
      
      // Keep only last 365 days
      state.performance = state.performance
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(-365);
    },

    // Demo data for testing
    loadDemoData: (state) => {
      const demoHoldings: Holding[] = [
        {
          id: 'demo-1',
          symbol: 'AAPL',
          name: 'Apple Inc.',
          quantity: 10,
          averagePrice: 150.00,
          currentPrice: 175.50,
          category: AssetCategory.STOCKS,
          sector: 'Technology',
          dateAdded: '2024-01-15',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'demo-2',
          symbol: 'BTC',
          name: 'Bitcoin',
          quantity: 0.5,
          averagePrice: 45000,
          currentPrice: 67000,
          category: AssetCategory.CRYPTO,
          dateAdded: '2024-02-20',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'demo-3',
          symbol: 'MSFT',
          name: 'Microsoft Corporation',
          quantity: 5,
          averagePrice: 300.00,
          currentPrice: 420.75,
          category: AssetCategory.STOCKS,
          sector: 'Technology',
          dateAdded: '2024-03-10',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'demo-4',
          symbol: 'SPY',
          name: 'SPDR S&P 500 ETF',
          quantity: 20,
          averagePrice: 400.00,
          currentPrice: 445.25,
          category: AssetCategory.ETF,
          dateAdded: '2024-01-05',
          lastUpdated: new Date().toISOString()
        }
      ];

      state.holdings = demoHoldings;
      state.summary = calculatePortfolioSummary(demoHoldings);
      
      // Add some demo performance data
      const baseDate = new Date();
      for (let i = 30; i >= 0; i--) {
        const date = new Date(baseDate);
        date.setDate(date.getDate() - i);
        
        const randomVariation = (Math.random() - 0.5) * 0.1; // ±5% variation
        const baseValue = state.summary.totalValue * (1 + randomVariation * (i / 30));
        
        state.performance.push({
          date: date.toISOString().split('T')[0],
          totalValue: baseValue,
          totalInvestment: state.summary.totalInvestment,
          gainLoss: baseValue - state.summary.totalInvestment,
          gainLossPercentage: ((baseValue - state.summary.totalInvestment) / state.summary.totalInvestment) * 100
        });
      }
    },

    // Clear all data
    clearPortfolio: (state) => {
      state.holdings = [];
      state.transactions = [];
      state.performance = [];
      state.summary = initialState.summary;
    }
  }
});

export const {
  setLoading,
  setError,
  addHolding,
  updateHolding,
  updateHoldingPrice,
  removeHolding,
  setHoldings,
  addTransaction,
  addPerformanceSnapshot,
  loadDemoData,
  clearPortfolio
} = portfolioSlice.actions;

export default portfolioSlice.reducer;