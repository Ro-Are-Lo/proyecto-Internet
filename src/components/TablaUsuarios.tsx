// src/components/TablaUsuarios.tsx
import { User } from '../models/User';

interface Props {
  usuarios: User[];
  onEliminar: (id: number) => void;
  onEditar: (usuario: User) => void;
  onVer: (usuario: User) => void;
}

export default function TablaUsuarios({ usuarios, onEliminar, onEditar, onVer }: Props) {
  return (
    <table className="w-full border rounded shadow bg-white">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2">Nombre</th>
          <th className="p-2">Usuario</th>
          <th className="p-2">Cédula</th>
          <th className="p-2">Género</th>
          <th className="p-2">Acciones111111</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map(u => (
          <tr key={u.usuario_id} className="border-t hover:bg-gray-50">
            <td className="p-2">{u.nombre} {u.apellido_paterno ?? ''}</td>
            <td className="p-2">{u.username}</td>
            <td className="p-2">{u.cedula_identidad}</td>
            <td className="p-2">{u.genero ?? '—'}</td>
            <td className="p-2 flex space-x-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => onEditar(u)}
              >
                Editar
              </button>
              <button
                className="text-green-500 hover:text-green-700"
                onClick={() => onVer(u)}
              >
                Ver
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => onEliminar(u.usuario_id)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
