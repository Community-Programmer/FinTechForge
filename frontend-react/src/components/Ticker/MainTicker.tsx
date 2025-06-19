import { useEffect } from "react";

const MainTicker = ({ theme = "light" }) => {
  useEffect(() => {
    const container = document.getElementById("tradingview-widget-container");
    if (container) container.innerHTML = ""; // Clear previous widget

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500 Index" },
        { proName: "FOREXCOM:NSXUSD", title: "US 100 Cash CFD" },
        { proName: "FX_IDC:EURUSD", title: "EUR to USD" },
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
        { proName: "BITSTAMP:ETHUSD", title: "Ethereum" }
      ],
      showSymbolLogo: true,
      isTransparent: false,
      displayMode: "adaptive",
      colorTheme: theme, // dynamic
      locale: "en"
    });

    if (container) {
      container.appendChild(script);
    }

    return () => {
      if (container) container.innerHTML = "";
    };
  }, [theme]); // re-run when theme changes

  return (
    <div className="tradingview-widget-container" id="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default MainTicker;
