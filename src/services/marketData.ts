import { MarketData, StockData, MarketIndex, CommodityData, CurrencyPair } from '../types/market';

// Mock market data - in production this would connect to a real financial API
const generateMockMarketData = (): MarketData => {
  const now = new Date();
  
  // Generate realistic price movements
  const randomChange = (base: number, volatility: number = 0.02) => {
    const change = (Math.random() - 0.5) * 2 * volatility * base;
    return {
      newPrice: base + change,
      change: change,
      changePercent: (change / base) * 100
    };
  };

  // Major indices
  const indices: MarketIndex[] = [
    {
      symbol: 'SPX',
      name: 'S&P 500',
      ...(() => {
        const data = randomChange(4789.85);
        return {
          value: Math.round(data.newPrice * 100) / 100,
          change: Math.round(data.change * 100) / 100,
          changePercent: Math.round(data.changePercent * 100) / 100
        };
      })()
    },
    {
      symbol: 'DJI',
      name: 'Dow Jones',
      ...(() => {
        const data = randomChange(39124.92);
        return {
          value: Math.round(data.newPrice * 100) / 100,
          change: Math.round(data.change * 100) / 100,
          changePercent: Math.round(data.changePercent * 100) / 100
        };
      })()
    },
    {
      symbol: 'IXIC',
      name: 'NASDAQ',
      ...(() => {
        const data = randomChange(16920.58);
        return {
          value: Math.round(data.newPrice * 100) / 100,
          change: Math.round(data.change * 100) / 100,
          changePercent: Math.round(data.changePercent * 100) / 100
        };
      })()
    }
  ];

  // Popular stocks
  const stocks: StockData[] = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      ...(() => {
        const data = randomChange(189.45);
        return {
          price: Math.round(data.newPrice * 100) / 100,
          change: Math.round(data.change * 100) / 100,
          changePercent: Math.round(data.changePercent * 100) / 100
        };
      })(),
      currency: 'USD'
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      ...(() => {
        const data = randomChange(142.18);
        return {
          price: Math.round(data.newPrice * 100) / 100,
          change: Math.round(data.change * 100) / 100,
          changePercent: Math.round(data.changePercent * 100) / 100
        };
      })(),
      currency: 'USD'
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      ...(() => {
        const data = randomChange(267.89, 0.03); // Tesla is more volatile
        return {
          price: Math.round(data.newPrice * 100) / 100,
          change: Math.round(data.change * 100) / 100,
          changePercent: Math.round(data.changePercent * 100) / 100
        };
      })(),
      currency: 'USD'
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corp.',
      ...(() => {
        const data = randomChange(421.76);
        return {
          price: Math.round(data.newPrice * 100) / 100,
          change: Math.round(data.change * 100) / 100,
          changePercent: Math.round(data.changePercent * 100) / 100
        };
      })(),
      currency: 'USD'
    },
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corp.',
      ...(() => {
        const data = randomChange(489.23, 0.025);
        return {
          price: Math.round(data.newPrice * 100) / 100,
          change: Math.round(data.change * 100) / 100,
          changePercent: Math.round(data.changePercent * 100) / 100
        };
      })(),
      currency: 'USD'
    }
  ];

  // Commodities
  const commodities: CommodityData[] = [
    {
      symbol: 'GOLD',
      name: 'Gold',
      ...(() => {
        const data = randomChange(1985.50, 0.015);
        return {
          price: Math.round(data.newPrice * 100) / 100,
          change: Math.round(data.change * 100) / 100,
          changePercent: Math.round(data.changePercent * 100) / 100
        };
      })(),
      unit: 'USD/oz'
    },
    {
      symbol: 'OIL',
      name: 'Crude Oil',
      ...(() => {
        const data = randomChange(89.32, 0.025);
        return {
          price: Math.round(data.newPrice * 100) / 100,
          change: Math.round(data.change * 100) / 100,
          changePercent: Math.round(data.changePercent * 100) / 100
        };
      })(),
      unit: 'USD/bbl'
    }
  ];

  // Currency pairs
  const currencies: CurrencyPair[] = [
    {
      pair: 'EUR/USD',
      name: 'Euro to US Dollar',
      ...(() => {
        const data = randomChange(1.0823, 0.01);
        return {
          rate: Math.round(data.newPrice * 10000) / 10000,
          change: Math.round(data.change * 10000) / 10000,
          changePercent: Math.round(data.changePercent * 100) / 100
        };
      })()
    },
    {
      pair: 'GBP/USD',
      name: 'British Pound to US Dollar',
      ...(() => {
        const data = randomChange(1.2567, 0.01);
        return {
          rate: Math.round(data.newPrice * 10000) / 10000,
          change: Math.round(data.change * 10000) / 10000,
          changePercent: Math.round(data.changePercent * 100) / 100
        };
      })()
    }
  ];

  return {
    indices,
    stocks,
    commodities,
    currencies,
    lastUpdated: now.toISOString()
  };
};

class MarketDataService {
  private static instance: MarketDataService;
  private updateInterval: NodeJS.Timeout | null = null;
  private subscribers: ((data: MarketData) => void)[] = [];
  private currentData: MarketData;

  constructor() {
    this.currentData = generateMockMarketData();
  }

  static getInstance(): MarketDataService {
    if (!MarketDataService.instance) {
      MarketDataService.instance = new MarketDataService();
    }
    return MarketDataService.instance;
  }

  // Get current market data
  getCurrentData(): MarketData {
    return this.currentData;
  }

  // Subscribe to real-time updates
  subscribe(callback: (data: MarketData) => void): () => void {
    this.subscribers.push(callback);

    // Start updates if this is the first subscriber
    if (this.subscribers.length === 1) {
      this.startUpdates();
    }

    // Return unsubscribe function
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
      if (this.subscribers.length === 0) {
        this.stopUpdates();
      }
    };
  }

  private startUpdates(): void {
    // Update every 5 seconds (in production you'd use WebSocket or real API)
    this.updateInterval = setInterval(() => {
      this.currentData = generateMockMarketData();
      this.notifySubscribers();
    }, 5000);
  }

  private stopUpdates(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  private notifySubscribers(): void {
    this.subscribers.forEach(callback => callback(this.currentData));
  }

  // Manual refresh
  async refresh(): Promise<MarketData> {
    this.currentData = generateMockMarketData();
    this.notifySubscribers();
    return this.currentData;
  }
}

export const marketDataService = MarketDataService.getInstance();
