import { useEffect } from "react";

// Fix: Add interface for component props
interface TradingWidgetsProps {
  symbol: string;
}

const TradingWidgets = ({ symbol }: TradingWidgetsProps) => {
  // Fix: Add types for function parameters
  const loadWidget = (id: string, scriptUrl: string, config: Record<string, any>) => {
    const container = document.getElementById(id);
    if (container) {
      container.innerHTML = ""; // Clear previous script
      const script = document.createElement("script");
      script.src = scriptUrl;
      script.async = true;
      script.innerHTML = JSON.stringify(config);
      container.appendChild(script);
    }
  };

  useEffect(() => {
    loadWidget("symbol-info-widget", "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js", {
      symbol,
      width: "100%",
      height: "100%",
      locale: "en",
      colorTheme: "light",
      isTransparent: true,
    });

    loadWidget("advanced-chart-widget", "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js", {
      autosize: true,
      symbol,
      interval: "D",
      timezone: "Etc/UTC",
      theme: "light",
      style: "1",
      locale: "en",
      allow_symbol_change: true,
      calendar: false,
    });

    loadWidget("company-profile-widget", "https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js", {
      width: "100%",
      height: "100%",
      colorTheme: "light",
      isTransparent: true,
      symbol,
      locale: "en",
    });

    loadWidget("fundamental-data-widget", "https://s3.tradingview.com/external-embedding/embed-widget-financials.js", {
      colorTheme: "light",
      isTransparent: true,
      width: "100%",
      height: "100%",
      symbol,
      locale: "en",
    });

    loadWidget("technical-analysis-container", "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js", {
      interval: "15m",
      colorTheme: "light",
      isTransparent: true,
      height: "100%",
      symbol,
      displayMode: "single",
      locale: "en",
    });

    loadWidget("top-stories-container", "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js", {
      colorTheme: "light",
      isTransparent: true,
      width: "100%",
      height: "100%",
      symbol,
      locale: "en",
    });

  }, [symbol]); 
  return (
    <main>
      <section id="symbol-info">
        <div id="symbol-info-widget" className="h-[30vh]"></div>
      </section>

      <section id="advanced-chart" className="mt-10">
        <div id="advanced-chart-widget" className="w-full h-[80vh]"></div>
      </section>

      <section id="company-profile">
        <div id="company-profile-widget" className="h-[40vh]"></div>
      </section>

      <section id="fundamental-data">
        <div id="fundamental-data-widget" className="h-[70vh]"></div>
      </section>

      <div className="flex flex-row mt-5">
        <section id="technical-analysis" className="w-[40vw] flex-1">
          <div id="technical-analysis-container" className="h-[60vh]"></div>
        </section>

        <section id="top-stories" className="w-[40vw] flex-1">
          <div id="top-stories-container" className="h-[50vh]"></div>
        </section>
      </div>
    </main>
  );
};

export default TradingWidgets;
