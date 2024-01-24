import type { INetwork, INote, IToken } from './interfaces';

export type ContractType = 'No contracts found' | Contract;

export class Contract {
  id: number;

  address: string;

  network: INetwork;

  name: string;

  balance: string;

  tokenBalanceUSD: string;

  tokens: IToken[];

  notes: INote[];

  isVerified: boolean;

  constructor() {
    this.id = 0;
    this.address = '';
    this.network = {
      id: 0,
      name: '',
    };
    this.name = '';
    this.balance = '0';
    this.tokenBalanceUSD = '0';
    this.tokens = [];
    this.notes = [];
    this.isVerified = false;
  }

  getColumns() {
    return [
      // 'Id',
      'Verified Code',
      'Name',
      'Address',
      'Native balance',
      'Token Balance USD',
      'Tokens',
      'Notes',
    ];
  }
}
