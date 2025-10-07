// src/pages/UsersPage.tsx
import React, { useEffect, useState } from 'react';
import { User, } from '../models/User';
import { getUsuarios, deleteUsuario } from '../services/usuarioService';
import TablaUsuarios from '../components/TablaUsuarios';
import UserModal from '../components/UserModal';
import UserCreateModal from '../components/UserCreateModal';
import UserEditModal from '../components/UserEditModal';

const UsersPage: React.FC = () => {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Traer usuarios
  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error(error);
      alert('Error al cargar los usuarios.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  // Crear usuario
  const handleCreate = (usuario: User) => {
    setUsuarios(prev => [...prev, usuario]);
  };

  // Editar usuario
  const handleEdit = (usuario: User) => {
    setUsuarios(prev =>
      prev.map(u => (u.usuario_id === usuario.usuario_id ? usuario : u))
    );
  };

  // Eliminar usuario
  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Seguro quieres eliminar este usuario?')) return;
    try {
      await deleteUsuario(id);
      setUsuarios(prev => prev.filter(u => u.usuario_id !== id));
    } catch (error) {
      console.error(error);
      alert('Error al eliminar usuario.');
    }
  };

  // Abrir modal editar
  const openEditModal = (usuario: User) => {
    setSelectedUser(usuario);
    setEditModalOpen(true);
  };

  // Abrir modal ver
  const openViewModal = (usuario: User) => {
    setSelectedUser(usuario);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Usuarios</h1>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors"
          onClick={() => setCreateModalOpen(true)}
        >
          Crear Usuario
        </button>
      </div>

      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <TablaUsuarios
          usuarios={usuarios}
          onEliminar={handleDelete}
          onEditar={openEditModal}
          onVer={openViewModal}
        />
      )}

      {selectedUser && !editModalOpen && (
        <UserModal usuario={selectedUser} onClose={() => setSelectedUser(null)} />
      )}

      {createModalOpen && (
        <UserCreateModal
          onClose={() => setCreateModalOpen(false)}
          onCreate={handleCreate}
        />
      )}

      {editModalOpen && selectedUser && (
        <UserEditModal
          usuario={selectedUser}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedUser(null);
          }}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default UsersPage;
