import React, { createContext, useEffect, useState } from 'react';
import type { AccessContextValue, IUser } from '../utils/interfaces';
import AuthService from '../services/AuthService';

export const AuthContext = createContext<AccessContextValue | undefined>(undefined);

export function AccessProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));
  const [user, setUser] = useState<IUser | null>(JSON.parse(localStorage.getItem('user') || 'null'));

  useEffect(() => {
    const verifyToken = async () => {
      if (!accessToken) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      const userPayload = await AuthService.verifyToken(accessToken);

      if (userPayload) {
        setUser({ id: userPayload.sub, username: userPayload.username });
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, []);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    } else {
      localStorage.removeItem('accessToken');
    }

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [accessToken, user]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAccessToken, setIsAuthenticated, setUser, user }}>{children}</AuthContext.Provider>
  );
}
