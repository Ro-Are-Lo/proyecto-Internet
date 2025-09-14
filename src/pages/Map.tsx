import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useSocket } from '../context/SocketContext';
import 'leaflet/dist/leaflet.css';

export default function Map() {
  const { locations } = useSocket();

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {locations.map((loc) => (
        <Marker key={loc.deviceId} position={[loc.latitude, loc.longitude]}>
          <Popup>
            Device: {loc.deviceId} <br />
            Speed: {loc.speed} km/h <br />
            Timestamp: {new Date(loc.ts).toLocaleString()}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
