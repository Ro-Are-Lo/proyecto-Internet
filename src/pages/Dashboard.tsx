import { useSocket } from '../context/SocketContext';

export default function Dashboard() {
  const { locations } = useSocket();

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>
      {locations.length === 0 && <p>No hay ubicaciones aún</p>}
      {locations.map((loc, i) => (
        <div key={i}>
          <strong>{loc.deviceId}</strong>: {loc.latitude}, {loc.longitude} —{' '}
          {new Date(loc.ts).toLocaleTimeString()}
        </div>
      ))}
    </div>
  );
}
