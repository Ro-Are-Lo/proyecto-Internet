import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const WS_URL = 'ws://localhost:4000';

export default function MapaAutos() {
  const [autos, setAutos] = useState({});
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(WS_URL);

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === 'update') {
          setAutos(data.locations);
        }
      } catch (error) {
        console.error('Error al parsear mensaje WebSocket:', error);
      }
    };

    ws.current.onerror = (err) => {
      console.error('WebSocket error:', err);
    };

    return () => {
      if (ws.current) ws.current.close();
    };
  }, []);

  return (
    <MapContainer
      center={[-17.9833, -67.1333]}
      zoom={13}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {Object.entries(autos).map(([id, data]) => (
        <Marker key={id} position={[data.lat, data.lng]}>
          <Popup>
            <strong>{id}</strong><br />
            Lat: {data.lat.toFixed(5)}<br />
            Lng: {data.lng.toFixed(5)}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
