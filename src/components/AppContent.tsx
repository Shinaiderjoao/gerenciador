import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Management } from '../pages/Management';
import { Catalog } from '../pages/Catalog';
import { Login } from '../pages/Login';
import { Part } from '../types';
import * as partsService from '../services/supabase';
import { Footer } from './Footer';
import { Report } from '../pages/Report';

export function AppContent() {
  const [parts, setParts] = useState<Part[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const navigate = useNavigate();

  const loadParts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await partsService.getParts();
      setParts(data || []);
    } catch (err) {
      console.error('Erro ao carregar peças:', err);
      setError('Erro ao carregar peças. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadParts();
  }, []);

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }, [isAuthenticated]);

  const addPart = async (newPart: Omit<Part, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      setError(null);
      const savedPart = await partsService.savePart(newPart);
      setParts(prevParts => [savedPart, ...prevParts]);
      return savedPart;
    } catch (err) {
      console.error('Erro ao adicionar peça:', err);
      setError('Erro ao adicionar peça. Tente novamente.');
      throw err;
    }
  };

  const updatePart = async (id: string, updatedPart: Partial<Part>) => {
    try {
      const part = await partsService.updatePart(id, updatedPart);
      setParts(parts.map(p => p.id === id ? part : p));
    } catch (error) {
      console.error('Erro ao atualizar peça:', error);
    }
  };

  const deletePart = async (id: string) => {
    try {
      await partsService.deletePart(id);
      setParts(parts.filter(p => p.id !== id));
    } catch (error) {
      console.error('Erro ao deletar peça:', error);
    }
  };

  const handleLogin = (auth: boolean) => {
    setIsAuthenticated(auth);
    if (auth) {
      navigate('/gerenciador');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <Header onOpenSidebar={() => setIsSidebarOpen(true)} isDarkMode={isDarkMode} />
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        isAuthenticated={isAuthenticated}
      />
      <main className={`flex-1 ${isAuthenticated ? 'pt-4 px-4 md:px-6 lg:px-8' : ''}`}>
        {isLoading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-500 border-t-transparent"></div>
          </div>
        ) : (
          <Routes>
            <Route 
              path="/" 
              element={
                isAuthenticated ? (
                  <Navigate to="/gerenciador" replace />
                ) : (
                  <Catalog 
                    parts={parts.filter(part => part.quantity > 0)} 
                    isDarkMode={isDarkMode} 
                    isAuthenticated={isAuthenticated}
                  />
                )
              } 
            />
            <Route 
              path="/login" 
              element={
                isAuthenticated ? (
                  <Navigate to="/gerenciador" replace />
                ) : (
                  <Login 
                    isDarkMode={isDarkMode} 
                    onLogin={handleLogin} 
                  />
                )
              } 
            />
            <Route 
              path="/gerenciador" 
              element={
                isAuthenticated ? (
                  <Management 
                    parts={parts}
                    onAddPart={addPart}
                    onUpdatePart={updatePart}
                    onDeletePart={deletePart}
                    isDarkMode={isDarkMode} 
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            <Route 
              path="/catalogo" 
              element={
                <Catalog 
                  parts={parts} 
                  isDarkMode={isDarkMode}
                  isAuthenticated={isAuthenticated} 
                />
              } 
            />
            <Route 
              path="/relatorio" 
              element={
                isAuthenticated ? (
                  <Report 
                    parts={parts}
                    isDarkMode={isDarkMode}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
          </Routes>
        )}
      </main>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
} 