import { useState } from "react";
import TickerTape from "@/components/Analysis/TickerTape";
import TradingWidgets from "@/components/Analysis/TradingWidgets";

const StockPage = () => {
  const [symbol, setSymbol] = useState("BSE:SENSEX"); // Default symbol

  document.title = `Stock Details - ${symbol}`;

  // Fix: Add proper typing for event parameter
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const inputSymbol = (formData.get('symbol') as string)?.trim();
    if (inputSymbol) {
      setSymbol(inputSymbol); // Update the stock symbol dynamically
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
      </div>
      <TickerTape />
      <TradingWidgets symbol={symbol} /> {/* Updates dynamically */}
      {/* <Footer /> */}
    </div>
  );
};

export default StockPage;
