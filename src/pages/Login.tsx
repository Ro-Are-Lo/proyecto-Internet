import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/axiosClient';
import { UserContext } from '../context/UserContext';
import { connectSocket } from '../services/socket';

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await api.post('/login', { email, password });
    const { token, user } = res.data; // tu backend devuelve token y user

    // Guardar usuario en contexto
    setUser(token, user.id, user.role);

    // Guardar en localStorage para pruebas / persistencia
    localStorage.setItem('token', token);
    localStorage.setItem('userId', user.id);
    localStorage.setItem('role', user.role);

    // Conectar Socket
    connectSocket(token);

    // Redirigir al dashboard
    navigate('/dashboard');
  } catch (err: any) {
    setError(err.response?.data?.message || 'Login failed');
  }
};


  return (
    <div style={{ maxWidth: 400, margin: 'auto', paddingTop: 50 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
