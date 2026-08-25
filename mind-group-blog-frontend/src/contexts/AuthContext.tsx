import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { authService } from '../services/auth.service';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, refreshToken: string, user: User) => void;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('mg_token');
    const storedUser = localStorage.getItem('mg_user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (tk: string, refreshToken: string, u: User) => {
    localStorage.setItem('mg_token', tk);
    localStorage.setItem('mg_refresh_token', refreshToken);
    localStorage.setItem('mg_user', JSON.stringify(u));
    setToken(tk);
    setUser(u);
  };

  // Os tokens são revogados no servidor antes de limpar localmente —
  // sem isso, o refresh token continuava válido mesmo depois do "logout".
  const logout = async () => {
    await authService.logout();
    localStorage.removeItem('mg_token');
    localStorage.removeItem('mg_refresh_token');
    localStorage.removeItem('mg_user');
    setToken(null);
    setUser(null);
  };

  const updateUser = (u: User) => {
    localStorage.setItem('mg_user', JSON.stringify(u));
    setUser(u);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUser, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
