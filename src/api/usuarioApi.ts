// src/api/usuarioApi.ts
import axios from 'axios';
import { Usuario } from '../types/Usuario';

const API_URL = 'http://localhost:3000/api/usuarios';

export const usuarioApi = {
  getAll: async (): Promise<Usuario[]> => {
    const res = await axios.get(API_URL);
    return res.data;
  },

  getById: async (id: number): Promise<Usuario> => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  },

  create: async (data: Omit<Usuario, 'usuario_id'> & { password: string }): Promise<Usuario> => {
    const res = await axios.post(API_URL, data);
    return res.data;
  },

  update: async (id: number, data: Partial<Usuario>): Promise<Usuario> => {
    const res = await axios.put(`${API_URL}/${id}`, data);
    return res.data;
  },

  delete: async (id: number): Promise<{ message: string }> => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  },
};
