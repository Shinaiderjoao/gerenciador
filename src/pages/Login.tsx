import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Key, User } from 'lucide-react';

interface LoginProps {
  isDarkMode: boolean;
  onLogin: (isAuthenticated: boolean) => void;
}

export function Login({ isDarkMode, onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'Shinaider' && password === '25079915') {
      onLogin(true);
      navigate('/gerenciador');
    } else {
      setError('Usuário ou senha incorretos');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className={`max-w-md w-full p-8 rounded-xl shadow-lg ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className={`text-2xl font-bold text-center mb-8 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>
          Área Administrativa
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Usuário
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className={`h-5 w-5 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`block w-full pl-10 pr-3 py-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-yellow-400 focus:ring-yellow-400' 
                    : 'bg-white border-gray-300 focus:border-yellow-500 focus:ring-yellow-500'
                }`}
                placeholder="Digite seu usuário"
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key className={`h-5 w-5 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`block w-full pl-10 pr-3 py-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-yellow-400 focus:ring-yellow-400' 
                    : 'bg-white border-gray-300 focus:border-yellow-500 focus:ring-yellow-500'
                }`}
                placeholder="Digite sua senha"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-lg transition-colors font-medium ${
              isDarkMode
                ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900'
                : 'bg-yellow-500 hover:bg-yellow-600 text-white'
            }`}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
} 