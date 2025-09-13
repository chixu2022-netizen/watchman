import React, { useState, useEffect } from 'react';
import { MarketData, StockData, MarketIndex, CommodityData, CurrencyPair } from '../types/market';
import { marketDataService } from '../services/marketData';
import './StockTicker.css';

const StockTicker: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial data
    const initialData = marketDataService.getCurrentData();
    setMarketData(initialData);
    setIsLoading(false);

    // Subscribe to updates
    const unsubscribe = marketDataService.subscribe((data) => {
      setMarketData(data);
    });

    return unsubscribe;
  }, []);

  const formatChange = (change: number, changePercent: number) => {
    const isPositive = change >= 0;
    const sign = isPositive ? '+' : '';
    return {
      isPositive,
      changeText: `${sign}${change.toFixed(2)}`,
      percentText: `${sign}${changePercent.toFixed(2)}%`
    };
  };

  const renderTickerItem = (
    symbol: string,
    name: string,
    value: number,
    change: number,
    changePercent: number,
    prefix: string = '',
    suffix: string = ''
  ) => {
    const { isPositive, changeText, percentText } = formatChange(change, changePercent);
    
    return (
      <div key={symbol} className="ticker-item">
        <div className="ticker-symbol">{symbol}</div>
        <div className="ticker-value">{prefix}{value.toLocaleString()}{suffix}</div>
        <div className={`ticker-change ${isPositive ? 'positive' : 'negative'}`}>
          {changeText} ({percentText})
        </div>
      </div>
    );
  };

  if (isLoading || !marketData) {
    return (
      <div className="stock-ticker loading">
        <div className="ticker-content">
          <div className="ticker-loading">Loading market data...</div>
        </div>
      </div>
    );
  }

  // Combine all ticker items
  const allTickerItems = [
    // Market indices
    ...marketData.indices.map((index: MarketIndex) =>
      renderTickerItem(index.symbol, index.name, index.value, index.change, index.changePercent)
    ),
    // Individual stocks
    ...marketData.stocks.map((stock: StockData) =>
      renderTickerItem(stock.symbol, stock.name, stock.price, stock.change, stock.changePercent, '$')
    ),
    // Commodities
    ...marketData.commodities.map((commodity: CommodityData) =>
      renderTickerItem(commodity.symbol, commodity.name, commodity.price, commodity.change, commodity.changePercent, '$')
    ),
    // Currencies
    ...marketData.currencies.map((currency: CurrencyPair) =>
      renderTickerItem(currency.pair, currency.name, currency.rate, currency.change, currency.changePercent)
    )
  ];

  return (
    <div className="stock-ticker">
      <div className="ticker-wrapper">
        <div className="ticker-label">
          <span className="ticker-label-text">MARKETS</span>
          <div className="ticker-live-dot"></div>
        </div>
        <div className="ticker-content">
          <div className="ticker-scroll">
            {/* Render items twice for seamless loop */}
            {allTickerItems}
            {allTickerItems}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockTicker;
