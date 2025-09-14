import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useContext(UserContext);
  if (!token) return <Navigate to="/login" />;
  return <>{children}</>;
};
