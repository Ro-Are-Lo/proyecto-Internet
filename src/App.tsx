import { UserProvider } from './context/UserContext';
import { SocketProvider } from './context/SocketContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; // <- importar Dashboard

function App() {
  return (
    <UserProvider>
      <SocketProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} /> {/* <- usar Dashboard */}
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </UserProvider>
  );
}

export default App;
