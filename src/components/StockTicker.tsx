import React, { useState, useEffect } from 'react';
import './StockTicker.css';

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

const StockTicker: React.FC = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Free API key for Alpha Vantage (demo key - replace with your own)
  const API_KEY = 'demo'; // Replace with your actual API key from https://www.alphavantage.co/support/#api-key

  const stockSymbols = [
    { symbol: 'SPY', name: 'S&P 500' },
    { symbol: 'QQQ', name: 'Nasdaq' },
    { symbol: 'IWM', name: 'Russell 2000' },
    { symbol: '^TNX', name: 'US 10 Yr' },
    { symbol: 'CL=F', name: 'Crude Oil' },
    { symbol: 'UKX', name: 'FTSE 100' }
  ];

  const fetchStockData = async () => {
    try {
      setLoading(true);
      const stockPromises = stockSymbols.map(async ({ symbol, name }) => {
        try {
          // Using Alpha Vantage Global Quote endpoint
          const response = await fetch(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
          );
          const data = await response.json();
          
          if (data['Global Quote']) {
            const quote = data['Global Quote'];
            return {
              symbol: name,
              name: name,
              price: parseFloat(quote['05. price']) || 0,
              change: parseFloat(quote['09. change']) || 0,
              changePercent: parseFloat(quote['10. change percent'].replace('%', '')) || 0
            };
          } else {
            // Fallback mock data if API fails
            return {
              symbol: name,
              name: name,
              price: Math.random() * 1000 + 1000,
              change: (Math.random() - 0.5) * 50,
              changePercent: (Math.random() - 0.5) * 5
            };
          }
        } catch (error) {
          console.error(`Error fetching ${symbol}:`, error);
          // Return mock data on error
          return {
            symbol: name,
            name: name,
            price: Math.random() * 1000 + 1000,
            change: (Math.random() - 0.5) * 50,
            changePercent: (Math.random() - 0.5) * 5
          };
        }
      });

      const results = await Promise.all(stockPromises);
      setStocks(results);
      setError(null);
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setError('Failed to fetch market data');
      
      // Fallback to mock data
      setStocks([
        { symbol: 'S&P 500', name: 'S&P 500', price: 6643.70, change: 39.12, changePercent: 0.59 },
        { symbol: 'Nasdaq', name: 'Nasdaq', price: 22484.07, change: 98.52, changePercent: 0.44 },
        { symbol: 'Russell 2000', name: 'Russell 2000', price: 2408.22, change: 14.15, changePercent: 0.59 },
        { symbol: 'US 10 Yr', name: 'US 10 Yr', price: 4.18, change: -0.002, changePercent: -0.05 },
        { symbol: 'Crude Oil', name: 'Crude Oil', price: 65.72, change: 0.74, changePercent: 1.14 },
        { symbol: 'FTSE 100', name: 'FTSE 100', price: 8292.66, change: 45.23, changePercent: 0.55 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockData();
    
    // Update every 5 minutes
    const interval = setInterval(fetchStockData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    if (price > 1000) {
      return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return price.toFixed(2);
  };

  const formatPercent = (percent: number) => {
    const sign = percent >= 0 ? '+' : '';
    return `${sign}${percent.toFixed(2)}%`;
  };

  if (loading) {
    return (
      <div className="stock-ticker">
        <div className="stock-ticker-container">
          <div className="stock-ticker-item">
            <span className="loading-text">Loading market data...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="stock-ticker">
      <div className="stock-ticker-container">
        <div className="stock-ticker-scroll">
          {stocks.map((stock, index) => (
            <div key={index} className="stock-ticker-item">
              <span className="stock-symbol">{stock.symbol}</span>
              <span className="stock-price">{formatPrice(stock.price)}</span>
              <span className={`stock-change ${stock.changePercent >= 0 ? 'positive' : 'negative'}`}>
                <span className="change-arrow">
                  {stock.changePercent >= 0 ? '▲' : '▼'}
                </span>
                {formatPercent(stock.changePercent)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockTicker;