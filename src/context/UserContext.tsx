import { createContext, useState, ReactNode } from 'react';

interface UserContextType {
  token: string | null;
  userId: string | null;
  role: string | null;
  setUser: (token: string, userId: string, role: string) => void;
}

export const UserContext = createContext<UserContextType>({
  token: null,
  userId: null,
  role: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const setUser = (token: string, userId: string, role: string) => {
    setToken(token);
    setUserId(userId);
    setRole(role);
  };

  return (
    <UserContext.Provider value={{ token, userId, role, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
