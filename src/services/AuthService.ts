import type { AxiosInstance } from 'axios';
import axios from 'axios';
import type { IUser } from '../types/interfaces.ts';

class AuthService {
  private readonly httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: 'http://localhost:3000/api',
    });
  }

  async verifyToken(accessToken: string) {
    try {
      const { data } = await this.httpClient.post('/auth/verify', {
        accessToken,
      });

      return data;
    } catch (error) {
      console.error('verifyToken error', error);
      return null;
    }
  }

  async signIn(username: string, password: string) {
    try {
      const { data } = await this.httpClient.post('/auth/signIn', {
        password,
        username,
      });

      return {
        accessToken: data.accessToken as string,
        user: data.user as IUser,
      };
    } catch (error) {
      console.error('signIn error', error);
      return null;
    }
  }
}

export default new AuthService();
