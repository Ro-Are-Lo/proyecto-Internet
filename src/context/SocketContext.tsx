// context/SocketContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { getSocket } from '../services/socket';

interface Location {
  deviceId: string;
  latitude: number;
  longitude: number;
  speed: number;
  heading: number;
  accuracy: number;
  ts: string;
}

interface SocketContextType {
  locations: Location[];
}

const SocketContext = createContext<SocketContextType>({ locations: [] });

export const SocketProvider = ({ children }: any) => {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on('location:updated', (data: Location) => {
      setLocations((prev) => [
        ...prev.filter((l) => l.deviceId !== data.deviceId),
        data,
      ]);
      console.log('Ubicación recibida:', data);
    });

    return () => {
      socket.off('location:updated');
    };
  }, []);

  return (
    <SocketContext.Provider value={{ locations }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
