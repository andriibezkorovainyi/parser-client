import type { INetwork, INote, IToken } from './interfaces';

// eslint-disable-next-line import/prefer-default-export
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

  // eslint-disable-next-line class-methods-use-this
  getColumns() {
    return [
      // 'Id',
      'Verified Code',
      'Network',
      'Name',
      'Address',
      'Native balance',
      'Token Balance USD',
      'Tokens',
      'Notes',
    ];
  }
}
