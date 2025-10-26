import requests
import json
from datetime import datetime

# Base URL of your API
BASE_URL = "http://localhost:8000"

def print_section(title):
    """Print a formatted section header"""
    print("\n" + "="*60)
    print(f"  {title}")
    print("="*60)

def print_response(response, title=""):
    """Print formatted API response"""
    if title:
        print(f"\n{title}:")
    print(f"Status Code: {response.status_code}")
    print(f"Response:")
    print(json.dumps(response.json(), indent=2))

def test_single_stock_quote():
    """Test getting a single stock quote"""
    print_section("TEST 1: Single Stock Quote")
    
    # Test with Apple stock
    symbol = "AAPL"
    print(f"\nFetching data for: {symbol}")
    
    response = requests.get(f"{BASE_URL}/api/v1/stocks/quote", params={"symbol": symbol})
    print_response(response, f"Quote for {symbol}")

def test_multiple_stock_quotes():
    """Test getting multiple stock quotes"""
    print_section("TEST 2: Multiple Stock Quotes")
    
    # Test with multiple stocks
    symbols = "AAPL,TSLA,GOOGL,MSFT"
    print(f"\nFetching data for: {symbols}")
    
    response = requests.get(f"{BASE_URL}/api/v1/stocks/quotes", params={"symbols": symbols})
    print_response(response, "Multiple Quotes")

def test_stock_search():
    """Test stock search"""
    print_section("TEST 3: Stock Search")
    
    query = "Apple"
    print(f"\nSearching for: {query}")
    
    response = requests.get(f"{BASE_URL}/api/v1/stocks/search", params={"query": query})
    print_response(response, "Search Results")

def test_stock_history():
    """Test getting historical stock data"""
    print_section("TEST 4: Stock History")
    
    symbol = "AAPL"
    period = "1mo"  # 1 month
    interval = "1d"  # daily interval
    
    print(f"\nFetching {period} history for: {symbol}")
    
    response = requests.get(
        f"{BASE_URL}/api/v1/stocks/history",
        params={"symbol": symbol, "period": period, "interval": interval}
    )
    
    result = response.json()
    print(f"Status Code: {response.status_code}")
    print(f"Symbol: {result.get('symbol')}")
    print(f"Period: {result.get('period')}")
    print(f"Data Points: {len(result.get('data', []))}")
    
    # Show first 3 data points
    if result.get('data'):
        print("\nFirst 3 data points:")
        for i, point in enumerate(result['data'][:3]):
            print(f"  {i+1}. Date: {point['date']}, Close: ${point['close']}")

def test_indian_stocks():
    """Test with Indian stocks"""
    print_section("TEST 5: Indian Stocks")
    
    # Indian stocks use .NS suffix
    symbols = "RELIANCE.NS,TCS.NS,INFY.NS"
    print(f"\nFetching data for Indian stocks: {symbols}")
    
    response = requests.get(f"{BASE_URL}/api/v1/stocks/quotes", params={"symbols": symbols})
    print_response(response, "Indian Stock Quotes")

def main():
    """Run all tests"""
    print("\n" + "🚀"*30)
    print("  Stock Data API Test Suite")
    print("🚀"*30)
    print(f"\nTesting API at: {BASE_URL}")
    print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    try:
        # Test 1: Single stock quote
        test_single_stock_quote()
        
        # Test 2: Multiple stock quotes
        test_multiple_stock_quotes()
        
        # Test 3: Stock search
        test_stock_search()
        
        # Test 4: Stock history
        test_stock_history()
        
        # Test 5: Indian stocks
        test_indian_stocks()
        
        print_section("✅ ALL TESTS COMPLETED")
        print(f"\nFinished at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        
    except requests.exceptions.ConnectionError:
        print("\n❌ ERROR: Could not connect to the API!")
        print("Make sure your Python backend is running on port 8000")
        print("Start it with: cd backend-python && uvicorn main:app --reload")
    except Exception as e:
        print(f"\n❌ ERROR: {str(e)}")

if __name__ == "__main__":
    main()

