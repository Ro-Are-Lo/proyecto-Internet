// src/models/User.ts
// Definición de los tipos de datos usados en el login
// src/models/User.ts
export interface User {
  usuario_id: number;
  username: string;
  nombre: string;
  apellido_paterno?: string;
  apellido_materno?: string;
  cedula_identidad: string;
  nacionalidad?: string;
  genero?: string;
  licencia_numero?: string;
  licencia_categoria?: string;
  foto_url?: string;
}

export interface LoginResponse {
  usuario: User;
  token: string;
  refreshToken: string;
}

