// src/components/UserModal.tsx
import React from 'react';
import { User } from '../models/User';

interface Props {
  usuario: User;
  onClose: () => void;
}

const UserModal: React.FC<Props> = ({ usuario, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Detalle del Usuario</h2>
        <div className="space-y-2">
          <p><strong>ID:</strong> {usuario.usuario_id}</p>
          <p><strong>Nombre:</strong> {usuario.nombre} {usuario.apellido_paterno ?? ''}</p>
          <p><strong>Usuario:</strong> {usuario.username}</p>
          <p><strong>Cédula:</strong> {usuario.cedula_identidad}</p>
          <p><strong>Género:</strong> {usuario.genero ?? '—'}</p>
        </div>
        <div className="mt-4 text-right">
          <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
