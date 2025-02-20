import React, { useState } from 'react';
import { Part } from '../types';
import { Pagination } from '../components/Pagination';
import { MessageCircle } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';

interface CatalogProps {
  parts: Part[];
  isDarkMode: boolean;
  isAuthenticated: boolean;
}

export function Catalog({ parts, isDarkMode, isAuthenticated }: CatalogProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredParts, setFilteredParts] = useState(parts);
  
  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredParts.length / itemsPerPage);
  const currentParts = filteredParts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  console.log('Peças recebidas:', parts); // Debug

  const handleRequestPart = (part: Part) => {
    const message = encodeURIComponent(
      `Olá! Gostaria de solicitar informações sobre a peça: ${part.name}\n` +
      `Código: ${part.id}\n` +
      `Preço: R$ ${part.price.toFixed(2)}`
    );
    window.open(`https://wa.me/5568999989131?text=${message}`, '_blank');
  };

  const handleSearch = (searchTerm: string) => {
    setCurrentPage(1); // Resetar para primeira página ao buscar
    if (!searchTerm.trim()) {
      setFilteredParts(parts);
      return;
    }

    const filtered = parts.filter(part =>
      part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredParts(filtered);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col space-y-6">
        <h1 className={`text-3xl font-bold ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>
          Catálogo de Peças
        </h1>

        <SearchBar
          parts={parts}
          onSearch={handleSearch}
          isDarkMode={isDarkMode}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentParts.map(part => {
            console.log('Renderizando peça:', part.id, 'URL da imagem:', part.image_url); // Debug
            return (
              <div
                key={part.id}
                className={`rounded-lg shadow-lg overflow-hidden ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                {/* Imagem */}
                <div className="aspect-video relative">
                  {part.image_url ? (
                    <img
                      src={part.image_url}
                      alt={part.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        console.error('Erro ao carregar imagem:', part.image_url);
                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Imagem+Indisponível';
                      }}
                    />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      <span className={`text-4xl ${
                        isDarkMode ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        🔧
                      </span>
                    </div>
                  )}
                </div>

                {/* Informações */}
                <div className="p-4">
                  <h2 className={`text-xl font-semibold mb-2 ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    {part.name}
                  </h2>
                  <p className={`text-sm mb-4 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {part.description}
                  </p>
                  <div className="flex flex-col space-y-3">
                    <div className="flex justify-between items-center">
                      <span className={`font-bold ${
                        isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
                      }`}>
                        R$ {part.price.toFixed(2)}
                      </span>
                      <span className={`text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        Disponível: {part.quantity}
                      </span>
                    </div>

                    {/* Botão de solicitar apenas para usuários não autenticados */}
                    {!isAuthenticated && (
                      <button
                        onClick={() => handleRequestPart(part)}
                        className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                          isDarkMode
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : 'bg-green-500 hover:bg-green-600 text-white'
                        }`}
                      >
                        <MessageCircle size={18} />
                        <span>Solicitar</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredParts.length === 0 && (
          <div className={`text-center py-12 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Nenhuma peça disponível no momento.
          </div>
        )}

        {filteredParts.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            isDarkMode={isDarkMode}
          />
        )}
      </div>
    </div>
  );
}