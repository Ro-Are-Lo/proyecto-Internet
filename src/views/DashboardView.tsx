// src/views/DashboardView.tsx
import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { User } from '../models/User';
import UserTable from '../components/UserTable';
import UserCreateModal from '../components/UserCreateModal';
import UserEditModal from '../components/UserEditModal';
import { useUserViewModel } from '../viewmodels/useUserViewModel'; // nuevo ViewModel

export default function DashboardView() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showUsuarios, setShowUsuarios] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState<User | null>(null);

  const {
    usuarios,
    addUsuario,
    removeUsuario,
    updateUsuarioLocal,
    loading
  } = useUserViewModel();

  const handleDelete = async (id: number) => {
    if (confirm('¿Seguro que deseas eliminar este usuario?')) {
      await removeUsuario(id);
    }
  };

  const handleCreate = async (newUser: any) => {
    try {
      await addUsuario(newUser);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  const handleEdit = (usuario: User) => {
    setUsuarioEditando(usuario);
    setShowEditModal(true);
  };

  const handleUpdateUsuario = (updatedUser: User) => {
    updateUsuarioLocal(updatedUser);
    setShowEditModal(false);
  };

  return (
    <div className="relative w-full h-screen bg-background-light dark:bg-background-dark">
      {/* Botón del menú */}
      <div className="absolute top-4 left-4 z-[1000]">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-black transition-all"
        >
          ☰
        </button>

        {/* Menú lateral */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out shadow-lg p-6 z-[1100]`}
        >
          <h2
            className="text-xl font-bold mb-6 cursor-pointer hover:text-primary"
            onClick={() => setMenuOpen(false)}
          >
            Menú
          </h2>
          <ul className="space-y-3 ml-2">
            <li>
              <a
                href="#"
                onClick={() => {
                  setShowUsuarios(true);
                  setMenuOpen(false);
                }}
                className="hover:text-blue-400 transition-colors"
              >
                Usuarios
              </a>
            </li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Conductor</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Vehículos</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Configuración</a></li>
          </ul>
        </div>
      </div>

      {/* Vista de mapa */}
      {!showUsuarios && (
        <>
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] w-96">
            <input
              type="text"
              placeholder="Buscar vehículo o conductor..."
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary shadow-lg"
            />
          </div>

          <div className="absolute top-4 right-4 z-[1000]">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="px-4 py-2 bg-primary text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all"
            >
              Perfil ▼
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg p-3 space-y-2 z-[1100]">
                <a href="#" className="block hover:text-primary">Mi perfil</a>
                <a href="#" className="block hover:text-primary">Configuración</a>
                <a href="#" className="block hover:text-red-500">Cerrar sesión</a>
              </div>
            )}
          </div>

          <MapContainer center={[-16.5, -68.15]} zoom={13} className="w-full h-full z-0">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </>
      )}

      {/* Vista de usuarios */}
      {showUsuarios && (
        <div className="absolute left-64 top-0 w-[calc(100%-16rem)] h-full bg-gray-100 dark:bg-gray-900 p-6 overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Usuarios</h2>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => setShowCreateModal(true)}
            >
              + Crear Usuario
            </button>
          </div>

          <UserTable
            usuarios={usuarios}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={() => {}}
          />

          {/* Modal de creación */}
          {showCreateModal && (
            <UserCreateModal
              onClose={() => setShowCreateModal(false)}
              onCreate={handleCreate}
            />
          )}

          {/* Modal de edición */}
          {showEditModal && usuarioEditando && (
            <UserEditModal
              usuario={usuarioEditando}
              onClose={() => setShowEditModal(false)}
              onEdit={handleUpdateUsuario}
            />
          )}
        </div>
      )}
    </div>
  );
}
