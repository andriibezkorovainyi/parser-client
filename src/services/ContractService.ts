import type { AxiosInstance } from 'axios';
import axios from 'axios';
import type { IAddNoteBody, IGetContractsQuery, ISearchContractsQuery } from '../utils/interfaces';
import { OperandType, OrderByType } from '../utils/enums';
import { HOST, PORT } from '../utils/constants';
import type { Contract } from '../utils/classes.ts';

function getFileName(query: IGetContractsQuery) {
  const fileParts = [];

  if (query.network) {
    fileParts.push(query.network);
  }

  if (query.balance > 0) {
    fileParts.push(`Native_Balance_${(query.balanceOperand === OperandType.MORE ? 'More_Then_' : 'Less_Then_') + query.balance}`);
  }

  if (query.tokenBalanceUSD > 0) {
    fileParts.push(
      `Token_Balance_USD_${(query.tokenBalanceUSDOperand === OperandType.MORE ? 'More_Then_' : 'Less_Then_') + query.tokenBalanceUSD}`
    );
  }

  if (query.tokenAddress) {
    fileParts.push(
      `Token_${`${query.tokenAddress}_${query.tokenUSDAmountOperand === OperandType.MORE ? 'More_Then_' : 'Less_Then_'}${
        query.tokenUSDAmount
      }`}`
    );
  }

  if (query.orderBy !== OrderByType.NONE) {
    fileParts.push(`Order_By_${query.orderBy === OrderByType.BALANCE ? 'Native_Balance' : 'Token_Balance_USD'}`);
  }

  return `${fileParts.join('&')}.zip`;
}

class ContractService {
  private readonly httpService: AxiosInstance;

  constructor() {
    this.httpService = axios.create({
      baseURL: `${HOST}:${PORT}/api/contract`,
      timeout: 5_000,
    });

    this.httpService.defaults.headers['Access-Control-Allow-Origin'] = '*';
  }

  addToken() {
    const token = localStorage.getItem('accessToken');
    this.httpService.defaults.headers.Authorization = `Bearer ${token}`;
  }

  async searchContracts(query: ISearchContractsQuery) {
    this.addToken();

    const { data } = await this.httpService.get('/search', {
      params: query,
    });

    return data as Contract[];
  }

  async getContracts(filters: IGetContractsQuery) {
    this.addToken();

    const { data } = await this.httpService.get('', {
      params: filters,
    });

    return data;
  }

  async getTokens(contractId: number) {
    this.addToken();

    const { data } = await this.httpService.get('/token', { params: { contractId } });

    return data;
  }

  async downloadArchive(query: IGetContractsQuery) {
    this.addToken();

    const response = await this.httpService.get('/downloadArchive', {
      headers: {
        'Accept-Ranges': 'bytes',
        'Content-Type': 'application/zip',
      },
      params: query,
      responseType: 'blob',
      timeout: Infinity,
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;

    link.setAttribute('download', getFileName(query));
    document.body.appendChild(link);
    link.click();

    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  async addNote(body: IAddNoteBody) {
    this.addToken();

    const { data } = await this.httpService.post('/note', body);

    return data;
  }

  async deleteNote(noteId: number) {
    this.addToken();

    const { data } = await this.httpService.delete('/note', {
      params: { noteId },
    });

    return data;
  }
}

export default new ContractService();
