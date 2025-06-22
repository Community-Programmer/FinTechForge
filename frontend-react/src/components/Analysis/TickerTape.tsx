import { useEffect } from "react";

const TickerTape = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "NASDAQ:TSLA" },
        { proName: "NASDAQ:AAPL" },
        { proName: "NASDAQ:NVDA" },
        { proName: "NASDAQ:MSFT" },
      ],
      showSymbolLogo: true,
      colorTheme: "light",
      displayMode: "adaptive",
      locale: "en",
    });
    
    // Fix: Add null check for getElementById
    const tickerElement = document.getElementById("ticker-tape");
    if (tickerElement) {
      tickerElement.appendChild(script);
    }
  }, []);

  return <div id="ticker-tape" className="tradingview-widget-container"></div>;
};

export default TickerTape;
