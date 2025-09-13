export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  currency: string;
}

export interface MarketIndex {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

export interface CommodityData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  unit: string;
}

export interface CurrencyPair {
  pair: string;
  name: string;
  rate: number;
  change: number;
  changePercent: number;
}

export interface MarketData {
  indices: MarketIndex[];
  stocks: StockData[];
  commodities: CommodityData[];
  currencies: CurrencyPair[];
  lastUpdated: string;
}
