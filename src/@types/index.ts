export interface PaginationType {
  page: number;
  limit: number;
}

export enum SortType {
  ASC = "asc",
  DESC = "desc",
}

export interface Sort {
  key: string;
  type: SortType;
}

export interface PaginationWithSort extends PaginationType {
  sort: Sort;
}

export interface GetWalletParams extends PaginationWithSort {
  network?: string;
}

export type TimeBuy = {
  time: string;
};

export interface HotTokenHolder {
  tokenName: string;
  isPartiallyClosed: boolean;
  balance: number;
  balanceType: string;
  "Buy Amount": number;
  "Buy Amount (USD)": number;
  "Sell Amount": 0;
  "Sell Amount (USD)": number;
  Profit: number;
  "Entry Price": number;
  "Exit Price": number;
  "Buy Times": TimeBuy[];
  "Sell Times": TimeBuy[];
  "Num of Buy Times": number;
  "Num of Sell Times": number;
  "Sell Amount of VISTA": number;
  "Buy Amount of VISTA": number;
  Balance: number;
  "Currency Address": string;
  tokenPrice: string;
  totalReserveInUSD: string;
  currentValue: number;
  currentProfit: number;
}

export interface ProfitableToken {
  profit: number;
  currencyAddress: string;
  buyAmount: number;
  buyTimes: number;
  sellTimes: number;
  totalTrades: number;
}

export interface WalletType {
  walletAddress: string;
  networkId: string;
  avgBuyAmount: number;
  winRate: number;
  netProfit: number;
  avgHoldingTime: number;
  buyAmountLabel: string;
  totalScore: number;
  age: number;
  dayActive: number;
  SwapTime: string[];
  TotalFee: number;
  BotActivity: string;
  details: string;
  totalnumPartiallyClosedData: number;
  totalNumofFullyOpenedData: number;
  totalTransactions: number;
  HotTokenHolders: HotTokenHolder[];
  top5ProfitableTokens: {
    [key: string]: ProfitableToken;
  };
  firstTopTokenHolder: HotTokenHolder;
  rank: number;
}

export interface ColumnType {
  key: string;
  title?: string;
}
