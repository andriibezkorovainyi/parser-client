import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { HOST, PORT } from '../utils/constants';
import type { IPointerHeight } from '../utils/interfaces';

class CacheService {
  private readonly httpService: AxiosInstance;

  constructor() {
    this.httpService = axios.create({
      baseURL: `${HOST}:${PORT}/api/cache`,
      timeout: 5_000,
    });

    this.httpService.defaults.headers['Access-Control-Allow-Origin'] = '*';
  }

  addToken() {
    const token = localStorage.getItem('accessToken');
    this.httpService.defaults.headers.Authorization = `Bearer ${token}`;
  }

  async getAllPointerHeights(): Promise<IPointerHeight[]> {
    try {
      this.addToken();

      const { data } = await this.httpService.get('/pointerHeights');

      return data;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}

export default new CacheService();
