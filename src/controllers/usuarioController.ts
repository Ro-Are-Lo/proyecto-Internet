// src/controllers/usuarioController.ts
import { usuarioService } from '../services/usuarioService';
import { Usuario } from '../types/Usuario';

export const usuarioController = {
  obtenerUsuarios: async (setUsuarios: (u: Usuario[]) => void, setCargando: (c: boolean) => void) => {
    setCargando(true);
    try {
      const data = await usuarioService.listarUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    } finally {
      setCargando(false);
    }
  },

  eliminarUsuario: async (id: number, recargar: () => void) => {
    if (confirm('¿Seguro que deseas eliminar este usuario?')) {
      await usuarioService.eliminarUsuario(id);
      recargar();
    }
  },
};
