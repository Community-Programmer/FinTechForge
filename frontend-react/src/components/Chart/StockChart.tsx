// TradingViewWidget.jsx
// Fix: Remove unused React import
import { useEffect, useRef, memo } from 'react';

function TradingViewWidget() {
  // Fix: Add proper typing for useRef
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sensexScript = document.createElement("script");
    sensexScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    sensexScript.type = "text/javascript";
    sensexScript.async = true;
    sensexScript.innerHTML = `
      {
        "symbols": [
          [
            "BSE Sensex",
            "BSE:SENSEX|12M"
          ]
        ],
        "chartOnly": false,
        "width": "800",
        "height": "600",
        "locale": "en",
        "colorTheme": "light",
        "autosize": false,
        "showVolume": true,
        "showMA": true,
        "hideDateRanges": false,
        "hideMarketStatus": false,
        "hideSymbolLogo": false,
        "scalePosition": "right",
        "scaleMode": "Normal",
        "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
        "fontSize": "10",
        "noTimeScale": false,
        "valuesTracking": "3",
        "changeMode": "price-only",
        "chartType": "candlesticks",
        "maLineColor": "#2962FF",
        "maLineWidth": 1,
        "maLength": 9,
        "lineType": 0,
        "dateRanges": [
          "1w|60",
          "1m|1D",
          "6m|120",
          "12m|1D",
          "60m|1W"
        ],
        "downColor": "#f7525f",
        "upColor": "#22ab94",
        "borderUpColor": "#22ab94",
        "borderDownColor": "#f7525f",
        "wickUpColor": "#22ab94",
        "wickDownColor": "#f7525f"
      }
    `;

    if (container.current) {
      container.current.appendChild(sensexScript);
    }

    return () => {
      if (container.current && container.current.contains(sensexScript)) {
        container.current.removeChild(sensexScript);
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
