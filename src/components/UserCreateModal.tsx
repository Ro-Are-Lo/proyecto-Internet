// src/components/UserCreateModal.tsx
import React, { useState } from 'react';

import { createUsuario } from '../services/usuarioService';
import { User } from '../models/User';

interface Props {
  onClose: () => void;
  onCreate: (User: User) => void;
}

const UserCreateModal: React.FC<Props> = ({ onClose, onCreate }) => {
  const [nombre, setNombre] = useState('');
  const [username, setUsername] = useState('');
  const [cedula, setCedula] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newUser = await createUsuario({ nombre, username, cedula_identidad: cedula, password: '1234' });
      onCreate(newUser);
      onClose();
    } catch (error) {
      console.error(error);
      alert('Error al crear usuario.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Crear Usuario</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required className="w-full px-3 py-2 border rounded" />
          <input type="text" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} required className="w-full px-3 py-2 border rounded" />
          <input type="text" placeholder="Cédula" value={cedula} onChange={e => setCedula(e.target.value)} required className="w-full px-3 py-2 border rounded" />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">Cancelar</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-green-500 text-white rounded">{loading ? 'Creando...' : 'Crear'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserCreateModal;
