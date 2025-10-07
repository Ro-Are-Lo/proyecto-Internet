// src/services/usuarioService.ts
import api from '../api/api';
import { User } from '../models/User';

export const getUsuarios = async (): Promise<User[]> => {
  const { data } = await api.get('/usuarios');
  return data;
};

export const getUsuarioById = async (id: number): Promise<User> => {
  const { data } = await api.get(`/usuarios/${id}`);
  return data;
};

export const createUsuario = async (user: Partial<User> & { password: string }): Promise<User> => {
  const { data } = await api.post('/usuarios', user);
  return data;
};

export const updateUsuario = async (id: number, user: Partial<User>): Promise<User> => {
  const { data } = await api.put(`/usuarios/${id}`, user);
  return data;
};

export const deleteUsuario = async (id: number): Promise<void> => {
  await api.delete(`/usuarios/${id}`);
};
