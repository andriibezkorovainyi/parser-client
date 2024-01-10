import type { NetworkType, OperandType } from './enums.ts';

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

export interface IContract {
  id: number;
  address: string;
  network: INetwork;
  name: string;
  balance: number;
  tokenBalanceUSD: number;
  tokens: IToken[];
  notes: INote[];
  isVerified: boolean;
}

export interface INetwork {
  id: number;
  name: string;
}

export interface IToken {
  id: number;
  name: string;
  address: string;
  balance: number;
  balanceUSD: number;
}

export interface INote {
  id: number;
  title: string;
  content: string;
  user: IUser;
}

export interface IGetContractsQuery {
  page?: number;
  verifiedOnly?: boolean;
  orderByBalance?: boolean;
  network: NetworkType;
  balance?: number;
  balanceOperand?: OperandType;
  tokenBalanceUSD?: number;
  tokenBalanceUSDOperand?: OperandType;
}
