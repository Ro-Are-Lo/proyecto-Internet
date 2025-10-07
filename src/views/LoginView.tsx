// src/views/LoginView.tsx
import React from "react";
import { useLoginViewModel } from "../viewmodels/LoginViewModel";

type LoginViewProps = {
  onLogin: () => void; // callback para avisar que se logueó
};

export default function LoginView({ onLogin }: LoginViewProps) {
  const {
    username,
    setUsername,
    password,
    setPassword,
    error,
    loading,
    handleLogin,
  } = useLoginViewModel();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin();
    // Si el login fue exitoso (usuario existe en ViewModel)
    if (!error) {
      onLogin();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black font-sans">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-900 rounded-2xl shadow-2xl">
        <div className="text-center">
          <h2 className="text-4xl font-black text-white">Welcome Back</h2>
          <p className="mt-2 text-base text-gray-400">Unlock your world.</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-5 py-4 text-white bg-gray-800 border border-gray-700 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-5 py-4 text-white bg-gray-800 border border-gray-700 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-4 text-base font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
