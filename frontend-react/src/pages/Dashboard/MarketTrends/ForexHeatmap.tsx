import { useEffect } from 'react';

const ForexHeatMap = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-forex-heat-map.js';
    script.async = true;
    script.type = 'text/javascript';
    script.innerHTML = `
      {
        "width": "100%",
        "height": "700",
        "currencies": [
          "EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD",
          "CNY", "TRY", "SEK", "NOK", "DKK", "ZAR", "HKD", "SGD",
          "THB", "MXN", "IDR", "KRW", "PLN", "ISK", "KWD", "PHP",
          "MYR", "INR", "TWD", "SAR", "AED", "RUB", "ILS", "ARS",
          "CLP", "COP", "PEN", "UYU"
        ],
        "isTransparent": false,
        "colorTheme": "light",
        "locale": "en",
        "backgroundColor": "#ffffff"
      }
    `;
    
    // Fix: Add null check for getElementById
    const container = document.getElementById('forex-heatmap-widget-container');
    if (container) {
      container.appendChild(script);
    }

    return () => {
      // Fix: Add null check for cleanup
      const container = document.getElementById('forex-heatmap-widget-container');
      if (container && container.contains(script)) {
        container.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container" id="forex-heatmap-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

export default ForexHeatMap;
