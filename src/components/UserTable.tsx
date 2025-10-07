// src/components/UserTable.tsx
import React from 'react';
import { User } from '../models/User'; 

interface Props {
  usuarios: User[];
  onEdit: (usuario: User) => void;
  onDelete: (usuario_id: number) => void;
  onView: (usuario: User) => void;
}

const UserTable: React.FC<Props> = ({ usuarios, onEdit, onDelete, onView }) => {
  return (
    <table className="min-w-full table-auto border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2 border">ID</th>
          <th className="px-4 py-2 border">Nombre</th>
          <th className="px-4 py-2 border">Usuario</th>
          <th className="px-4 py-2 border">Roles</th>
          <th className="px-4 py-2 border">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((user) => (
          <tr key={user.usuario_id} className="hover:bg-gray-100">
            <td className="px-4 py-2 border">{user.usuario_id}</td>
            <td className="px-4 py-2 border">
              {user.nombre} {user.apellido_paterno}
            </td>
            <td className="px-4 py-2 border">{user.username}</td>
            <td className="px-4 py-2 border">
              {user.roles?.map((r) => r.rol.nombre).join(', ') || 'Sin rol'}
            </td>
            <td className="px-4 py-2 border space-x-2">
              
              
              
              <button
                className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-700"
                onClick={() => onView(user)}
              >
                Ver
              </button>
              <button
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={() => onEdit(user)}
              >
                Editar
              </button>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                onClick={() => onDelete(user.usuario_id)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
