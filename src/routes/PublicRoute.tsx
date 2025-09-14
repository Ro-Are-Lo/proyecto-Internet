import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useContext(UserContext);
  if (token) return <Navigate to="/dashboard" />;
  return <>{children}</>;
};
