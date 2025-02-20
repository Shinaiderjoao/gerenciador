import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Wrench, X, LayoutGrid, Settings, Sun, Moon, LogOut, LogIn, ExternalLink, MessageCircle, FileSpreadsheet } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isAuthenticated: boolean;
}

export function Sidebar({ isOpen, onClose, isDarkMode, onToggleDarkMode, isAuthenticated }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem('isAuthenticated', 'false');
    window.location.href = '/';
  };

  const whatsappLink = "https://wa.me/5568999989131";

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-[280px] transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isDarkMode ? 'bg-gray-800' : 'bg-yellow-500'}`}
      >
        <div className={`flex items-center justify-between p-4 border-b ${
          isDarkMode ? 'border-gray-700' : 'border-yellow-400'
        }`}>
          <div className="flex items-center space-x-3 text-white">
            <Wrench size={24} />
            <span className="text-xl font-bold">Sistema de Peças</span>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-yellow-100 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {isAuthenticated ? (
            <>
              <Link
                to="/gerenciador"
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  location.pathname === '/gerenciador' || location.pathname === '/'
                    ? isDarkMode 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-yellow-600 text-white'
                    : isDarkMode
                      ? 'text-gray-200 hover:bg-gray-700'
                      : 'text-white hover:bg-yellow-600'
                }`}
                onClick={onClose}
              >
                <Settings size={20} />
                <span>Gerenciamento</span>
              </Link>

              <Link
                to="/relatorio"
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  location.pathname === '/relatorio'
                    ? isDarkMode 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-yellow-600 text-white'
                    : isDarkMode
                      ? 'text-gray-200 hover:bg-gray-700'
                      : 'text-white hover:bg-yellow-600'
                }`}
                onClick={onClose}
              >
                <FileSpreadsheet size={20} />
                <span>Relatório</span>
              </Link>

              <Link
                to="/catalogo"
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  location.pathname === '/catalogo'
                    ? isDarkMode 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-yellow-600 text-white'
                    : isDarkMode
                      ? 'text-gray-200 hover:bg-gray-700'
                      : 'text-white hover:bg-yellow-600'
                }`}
                onClick={onClose}
              >
                <LayoutGrid size={20} />
                <span>Catálogo</span>
              </Link>

              <a
                href="https://carcacas-shinaider.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'text-gray-200 hover:bg-gray-700'
                    : 'text-white hover:bg-yellow-600'
                }`}
                onClick={onClose}
              >
                <ExternalLink size={20} />
                <span>Shinaider Carcaças</span>
              </a>

              <button
                onClick={handleLogout}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors w-full ${
                  isDarkMode
                    ? 'text-gray-200 hover:bg-gray-700'
                    : 'text-white hover:bg-yellow-600'
                }`}
              >
                <LogOut size={20} />
                <span>Sair</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/catalogo"
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  location.pathname === '/catalogo'
                    ? isDarkMode 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-yellow-600 text-white'
                    : isDarkMode
                      ? 'text-gray-200 hover:bg-gray-700'
                      : 'text-white hover:bg-yellow-600'
                }`}
                onClick={onClose}
              >
                <LayoutGrid size={20} />
                <span>Catálogo</span>
              </Link>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'text-gray-200 hover:bg-gray-700'
                    : 'text-white hover:bg-yellow-600'
                }`}
                onClick={onClose}
              >
                <MessageCircle size={20} />
                <span>Contato</span>
              </a>

              <a
                href="https://carcacas-shinaider.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'text-gray-200 hover:bg-gray-700'
                    : 'text-white hover:bg-yellow-600'
                }`}
                onClick={onClose}
              >
                <ExternalLink size={20} />
                <span>Shinaider Carcaças</span>
              </a>

              <Link
                to="/login"
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  location.pathname === '/login'
                    ? isDarkMode 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-yellow-600 text-white'
                    : isDarkMode
                      ? 'text-gray-200 hover:bg-gray-700'
                      : 'text-white hover:bg-yellow-600'
                }`}
                onClick={onClose}
              >
                <LogIn size={20} />
                <span>Área Administrativa</span>
              </Link>
            </>
          )}

          <button
            onClick={onToggleDarkMode}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors w-full ${
              isDarkMode
                ? 'text-gray-200 hover:bg-gray-700'
                : 'text-white hover:bg-yellow-600'
            }`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            <span>{isDarkMode ? 'Ativar Modo Claro' : 'Ativar Modo Escuro'}</span>
          </button>
        </nav>
      </div>
    </>
  );
}