from fastapi import APIRouter, HTTPException
from typing import List, Optional
import yfinance as yf
from datetime import datetime, timedelta

router = APIRouter()

@router.get("/quote")
async def get_stock_quote(symbol: str):
    """
    Get real-time stock quote for a single symbol
    
    Args:
        symbol: Stock ticker symbol (e.g., 'AAPL', 'TSLA', 'GOOGL')
    
    Returns:
        JSON with stock data including price, change, volume, etc.
    """
    try:
        ticker = yf.Ticker(symbol)
        info = ticker.info
        
        # Get current price data - use fast_info for better performance
        try:
            fast_info = ticker.fast_info
            current_price = fast_info.get('lastPrice', 0)
        except Exception:
            # Fallback to daily interval if fast_info fails
            hist = ticker.history(period="1d", interval="1d")
            if hist.empty or len(hist) == 0:
                raise HTTPException(status_code=404, detail=f"No data found for symbol: {symbol}")
            current_price = hist['Close'].iloc[-1]
        
        previous_close = info.get('previousClose', current_price)
        change = current_price - previous_close
        change_percent = (change / previous_close) * 100 if previous_close else 0
        
        return {
            "symbol": symbol.upper(),
            "companyName": info.get('longName', symbol),
            "currentPrice": round(current_price, 2),
            "previousClose": round(previous_close, 2),
            "change": round(change, 2),
            "changePercent": round(change_percent, 2),
            "volume": info.get('volume', 0),
            "marketCap": info.get('marketCap', 0),
            "currency": info.get('currency', 'USD'),
            "exchange": info.get('exchange', 'N/A'),
            "sector": info.get('sector', 'N/A'),
            "industry": info.get('industry', 'N/A'),
            "website": info.get('website', 'N/A'),
            "logo": info.get('logo_url', ''),
            "fiftyTwoWeekHigh": info.get('fiftyTwoWeekHigh', 0),
            "fiftyTwoWeekLow": info.get('fiftyTwoWeekLow', 0),
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching stock data: {str(e)}")


@router.get("/quotes")
async def get_multiple_stock_quotes(symbols: str):
    """
    Get real-time stock quotes for multiple symbols
    
    Args:
        symbols: Comma-separated stock ticker symbols (e.g., 'AAPL,TSLA,GOOGL')
    
    Returns:
        JSON array with stock data for each symbol
    """
    try:
        symbol_list = [s.strip().upper() for s in symbols.split(',')]
        
        # Use batch download for better performance
        try:
            # Download all stocks in parallel
            data = yf.download(tickers=symbol_list, period="1d", interval="1d", group_by='ticker', progress=False)
            
            results = []
            for symbol in symbol_list:
                try:
                    ticker = yf.Ticker(symbol)
                    info = ticker.info
                    
                    # Get current price from batch data or fast_info
                    try:
                        # Try to get from batch download data
                        if hasattr(data.columns, 'levels') and symbol in data.columns.levels[0]:
                            close_series = data[symbol]['Close']
                            current_price = close_series.iloc[-1] if not close_series.empty and len(close_series) > 0 else None
                        elif not data.empty and 'Close' in data.columns:
                            # Single column dataframe - get last close price
                            close_series = data['Close']
                            current_price = close_series.iloc[-1] if not close_series.empty and len(close_series) > 0 else None
                        else:
                            current_price = None
                        
                        # Fallback to fast_info if batch data fails
                        if current_price is None or current_price == 0:
                            fast_info = ticker.fast_info
                            current_price = fast_info.get('lastPrice', 0)
                    except Exception:
                        # Final fallback to fast_info
                        try:
                            fast_info = ticker.fast_info
                            current_price = fast_info.get('lastPrice', 0)
                        except Exception:
                            current_price = 0
                    
                    if current_price == 0 or current_price is None:
                        results.append({
                            "symbol": symbol,
                            "error": "No data available"
                        })
                        continue
                    
                    previous_close = info.get('previousClose', current_price)
                    change = current_price - previous_close
                    change_percent = (change / previous_close) * 100 if previous_close else 0
                    
                    results.append({
                        "symbol": symbol,
                        "companyName": info.get('longName', symbol),
                        "currentPrice": round(current_price, 2),
                        "previousClose": round(previous_close, 2),
                        "change": round(change, 2),
                        "changePercent": round(change_percent, 2),
                        "volume": info.get('volume', 0),
                        "marketCap": info.get('marketCap', 0),
                        "currency": info.get('currency', 'USD'),
                        "logo": info.get('logo_url', ''),
                        "timestamp": datetime.now().isoformat()
                    })
                except Exception as e:
                    results.append({
                        "symbol": symbol,
                        "error": str(e)
                    })
        except Exception:
            # Fallback to sequential fetching if batch fails
            results = []
            for symbol in symbol_list:
                try:
                    ticker = yf.Ticker(symbol)
                    info = ticker.info
                    
                    try:
                        fast_info = ticker.fast_info
                        current_price = fast_info.get('lastPrice', 0)
                    except Exception:
                        hist = ticker.history(period="1d", interval="1d")
                        if hist.empty or len(hist) == 0:
                            results.append({
                                "symbol": symbol,
                                "error": "No data available"
                            })
                            continue
                        current_price = hist['Close'].iloc[-1]
                    
                    previous_close = info.get('previousClose', current_price)
                    change = current_price - previous_close
                    change_percent = (change / previous_close) * 100 if previous_close else 0
                    
                    results.append({
                        "symbol": symbol,
                        "companyName": info.get('longName', symbol),
                        "currentPrice": round(current_price, 2),
                        "previousClose": round(previous_close, 2),
                        "change": round(change, 2),
                        "changePercent": round(change_percent, 2),
                        "volume": info.get('volume', 0),
                        "marketCap": info.get('marketCap', 0),
                        "currency": info.get('currency', 'USD'),
                        "logo": info.get('logo_url', ''),
                        "timestamp": datetime.now().isoformat()
                    })
                except Exception as e:
                    results.append({
                        "symbol": symbol,
                        "error": str(e)
                    })
        
        return {"data": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching stock data: {str(e)}")


@router.get("/search")
async def search_stocks(query: str):
    """
    Search for stocks by company name or symbol
    
    Args:
        query: Search term (company name or ticker symbol)
    
    Returns:
        List of matching stocks
    """
    try:
        # Using yfinance's search functionality
        # Note: This is a simplified search. For better results, consider using a dedicated stock search API
        ticker = yf.Ticker(query)
        info = ticker.info
        
        if 'symbol' not in info:
            return {"data": []}
        
        return {
            "data": [{
                "symbol": info.get('symbol', query),
                "companyName": info.get('longName', info.get('shortName', query)),
                "exchange": info.get('exchange', 'N/A'),
                "sector": info.get('sector', 'N/A'),
                "industry": info.get('industry', 'N/A')
            }]
        }
    except Exception as e:
        return {"data": [], "error": str(e)}


@router.get("/history")
async def get_stock_history(symbol: str, period: str = "1mo", interval: str = "1d"):
    """
    Get historical stock data
    
    Args:
        symbol: Stock ticker symbol
        period: Time period (1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y, ytd, max)
        interval: Data interval (1m, 2m, 5m, 15m, 30m, 60m, 90m, 1h, 1d, 5d, 1wk, 1mo, 3mo)
    
    Returns:
        Historical price data
    """
    try:
        ticker = yf.Ticker(symbol)
        hist = ticker.history(period=period, interval=interval)
        
        if hist.empty:
            raise HTTPException(status_code=404, detail=f"No historical data found for symbol: {symbol}")
        
        # Convert to list of dictionaries
        data = []
        for index, row in hist.iterrows():
            data.append({
                "date": index.isoformat(),
                "open": round(row['Open'], 2),
                "high": round(row['High'], 2),
                "low": round(row['Low'], 2),
                "close": round(row['Close'], 2),
                "volume": int(row['Volume'])
            })
        
        return {
            "symbol": symbol.upper(),
            "period": period,
            "interval": interval,
            "data": data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching historical data: {str(e)}")

