// src/components/UserEditModal.tsx
import React, { useState } from 'react';
import { updateUsuario } from '../services/usuarioService';
import { User } from '../models/User';

interface Props {
  usuario: User;
  onClose: () => void;
  onEdit: (usuario: User) => void;
}

const UserEditModal: React.FC<Props> = ({ usuario, onClose, onEdit }) => {
  const [nombre, setNombre] = useState(usuario.nombre);
  const [username, setUsername] = useState(usuario.username);
  const [cedula, setCedula] = useState(usuario.cedula_identidad);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedUser = await updateUsuario(usuario.usuario_id, { nombre, username, cedula_identidad: cedula });
      onEdit(updatedUser);
      onClose();
    } catch (error) {
      console.error(error);
      alert('Error al actualizar usuario.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Editar Usuario</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required className="w-full px-3 py-2 border rounded" />
          <input type="text" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} required className="w-full px-3 py-2 border rounded" />
          <input type="text" placeholder="Cédula" value={cedula} onChange={e => setCedula(e.target.value)} required className="w-full px-3 py-2 border rounded" />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">Cancelar</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-500 text-white rounded">{loading ? 'Actualizando...' : 'Guardar'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditModal;
