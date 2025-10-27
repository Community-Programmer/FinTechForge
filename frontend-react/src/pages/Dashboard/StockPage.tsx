import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import TickerTape from "@/components/Analysis/TickerTape";
import TradingWidgets from "@/components/Analysis/TradingWidgets";
import RecentSearchService from "@/services/RecentSearchService";
import RecentSearches from "@/components/RecentSearches";

const StockPage = () => {
  const [searchParams] = useSearchParams();
  const urlSymbol = searchParams.get("symbol");
  const [symbol, setSymbol] = useState(urlSymbol || "BSE:SENSEX"); // Default symbol

  useEffect(() => {
    if (urlSymbol) {
      setSymbol(urlSymbol);
      // Add to recent searches when symbol comes from URL
      if (urlSymbol) {
        RecentSearchService.add(urlSymbol, 'stock');
      }
    }
  }, [urlSymbol]);

  document.title = `Stock Details - ${symbol}`;

  // Fix: Add proper typing for event parameter
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const inputSymbol = (formData.get("symbol") as string)?.trim();
    if (inputSymbol) {
      setSymbol(inputSymbol); // Update the stock symbol dynamically
      // Add to recent searches
      RecentSearchService.add(inputSymbol, 'stock');
    }
  };

  return (
    <div>
      {/* <Header /> */}
      <div style={{ padding: "10px", textAlign: "center" }}>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            name="symbol"
            placeholder="Enter Stock Ticker (e.g., NSE:TCS)"
            style={{
              padding: "8px",
              width: "250px",
              marginRight: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "8px 15px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#007bff",
              color: "white",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </form>
        
        <RecentSearches 
          type="stock" 
          onSearchSelect={(query) => {
            setSymbol(query);
          }} 
        />
      </div>
      <TickerTape />
      <TradingWidgets symbol={symbol} /> {/* Updates dynamically */}
      {/* <Footer /> */}
    </div>
  );
};

export default StockPage;
