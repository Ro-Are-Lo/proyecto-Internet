// src/services/authService.ts
// Servicio encargado de comunicarse con la API de login

import { LoginResponse } from '../models/User';

export async function login(username: string, password: string): Promise<LoginResponse> {
  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error en login');
  }

  return await response.json();
}
