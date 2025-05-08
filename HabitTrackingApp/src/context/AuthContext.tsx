import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getUser, storeUser, clearAllUserData,clearUser } from '../services/authService';
import { User } from '../types/types';

type AuthContextType = {
  user: User | null;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  clearAllData:()=>Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
  loading: true,
  clearAllData: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await getUser();
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (userData: User) => {
    await storeUser(userData);
    setUser(userData);
  };

  const logout = async () => {
    await clearUser();
    setUser(null);
  };

  // Add this new function
const clearAllData = async () => {
  if (user?.id) {
    await clearAllUserData(user.id);
    setUser(null);
  }
};


return (
  <AuthContext.Provider value={{ user, login, logout, clearAllData, loading }}>
    {children}
  </AuthContext.Provider>
)
};