import type { NetworkType, OperandType, OrderByType } from './enums.ts';

export interface AccessContextValue {
  accessToken?: string | null;
  setAccessToken: (accessToken: string | null) => void;
  user?: IUser | null;
  setUser: (user: IUser | null) => void;
  isAuthenticated?: boolean;
  setIsAuthenticated: (bool: boolean) => void;
}

export interface IVerifyTokenResponse {
  sub: number;
  username: string;
}

export interface IUser {
  id: number;
  username: string;
}

export interface INetwork {
  id: number;
  name: string;
}

export interface IToken {
  id: number;
  name: string;
  address: string;
  balance: string;
  balanceUSD: string;
}

export interface INote {
  id: number;
  title: string;
  content: string;
  user: IUser;
  updatedAt: string;
}

export interface IGetContractsQuery {
  page: number;
  verifiedOnly: boolean;
  network: NetworkType;
  balance: number;
  balanceOperand: OperandType;
  tokenBalanceUSD: number;
  tokenBalanceUSDOperand: OperandType;
  tokenAddress: string;
  tokenUSDAmount: number;
  tokenUSDAmountOperand: OperandType;
  orderBy: OrderByType;
  fromBlock?: number;
  toBlock?: number;
}

export interface ISearchContractsQuery {
  page?: number;
  address: string;
}

export interface IAddNoteBody {
  title: string;
  content: string;
  contractId: number;
  userId: number;
}

export interface IPointerHeight {
  network: NetworkType;
  height: number;
  percentage: number;
}
