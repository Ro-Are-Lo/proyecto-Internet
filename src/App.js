// src/App.js
import React from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

import MapaAutos from './components/MapaAutos';

function App() {
  return (
    <div className="App">
      <h2 style={{ textAlign: 'center' }}>📍 Rastreo en Tiempo Real</h2>
      <MapaAutos />
    </div>
  );
}

export default App;
