import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Image as ImageIcon, DollarSign } from 'lucide-react';
import { Part } from '../types';
import { PartForm } from '../components/PartForm';
import { Pagination } from '../components/Pagination';
import { SellModal } from '../components/SellModal';
import { DeleteModal } from '../components/DeleteModal';
import { SearchBar } from '../components/SearchBar';

interface ManagementProps {
  parts: Part[];
  onAddPart: (part: Omit<Part, 'id' | 'created_at' | 'updated_at'>) => void;
  onUpdatePart: (id: string, part: Partial<Part>) => void;
  onDeletePart: (id: string) => void;
  isDarkMode: boolean;
}

export function Management({ 
  parts, 
  onAddPart, 
  onUpdatePart, 
  onDeletePart, 
  isDarkMode 
}: ManagementProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddingPart, setIsAddingPart] = useState(false);
  const [editingPart, setEditingPart] = useState<Part | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sellingPart, setSellingPart] = useState<Part | null>(null);
  const [deletingPart, setDeletingPart] = useState<Part | null>(null);
  const [filteredParts, setFilteredParts] = useState(parts);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(filteredParts.length / itemsPerPage);
  const currentParts = filteredParts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddPart = async (newPart: Omit<Part, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      await onAddPart(newPart);
      setIsAddingPart(false);
      setError(null);
    } catch (err) {
      console.error('Erro ao adicionar peça:', err);
      setError('Erro ao adicionar peça. Por favor, tente novamente.');
    }
  };

  const handleEditPart = (updatedPart: Omit<Part, 'id' | 'created_at' | 'updated_at'>) => {
    if (!editingPart) return;
    onUpdatePart(editingPart.id, updatedPart);
    setEditingPart(null);
  };

  const handleDeleteClick = (part: Part) => {
    setDeletingPart(part);
  };

  const handleDeleteConfirm = () => {
    if (deletingPart) {
      onDeletePart(deletingPart.id);
      setDeletingPart(null);
    }
  };

  const handleSell = async (quantity: number) => {
    if (!sellingPart) return;
    
    try {
      const updatedQuantity = sellingPart.quantity - quantity;
      await onUpdatePart(sellingPart.id, { quantity: updatedQuantity });
      
      setFilteredParts(prevParts => 
        prevParts.map(part => 
          part.id === sellingPart.id 
            ? { ...part, quantity: updatedQuantity }
            : part
        )
      );

      setSellingPart(null);
    } catch (err) {
      console.error('Erro ao registrar venda:', err);
    }
  };

  const handleSearch = (searchTerm: string) => {
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
        <div className="flex justify-between items-center">
          <h1 className={`text-3xl font-bold ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Gerenciamento de Peças
          </h1>
          <button
            onClick={() => setIsAddingPart(true)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors shadow-md ${
              isDarkMode
                ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900'
                : 'bg-yellow-500 hover:bg-yellow-600 text-white'
            }`}
          >
            <Plus size={20} />
            <span>Adicionar Peça</span>
          </button>
        </div>

        <SearchBar
          parts={parts}
          onSearch={handleSearch}
          isDarkMode={isDarkMode}
        />

        {isAddingPart && (
          <div className={`mb-8 p-8 rounded-xl shadow-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-semibold ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>Adicionar Nova Peça</h2>
              <button
                onClick={() => setIsAddingPart(false)}
                className={`${
                  isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
                } transition-colors`}
              >
                ✕
              </button>
            </div>
            <PartForm onSubmit={handleAddPart} buttonText="Adicionar Peça" isDarkMode={isDarkMode} />
          </div>
        )}

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {currentParts.map(part => (
            <div
              key={part.id}
              className={`rounded-lg shadow-lg overflow-hidden ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
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
                    <ImageIcon className={`w-12 h-12 ${
                      isDarkMode ? 'text-gray-600' : 'text-gray-400'
                    }`} />
                  </div>
                )}

                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={() => setSellingPart(part)}
                    className={`p-2 rounded-full transition-colors ${
                      isDarkMode 
                        ? 'bg-gray-700 hover:bg-green-600 text-gray-200' 
                        : 'bg-white hover:bg-green-100 text-gray-700'
                    }`}
                    title="Registrar Venda"
                  >
                    <DollarSign size={16} />
                  </button>
                  <button
                    onClick={() => setEditingPart(part)}
                    className={`p-2 rounded-full transition-colors ${
                      isDarkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                        : 'bg-white hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(part)}
                    className={`p-2 rounded-full transition-colors ${
                      isDarkMode 
                        ? 'bg-gray-700 hover:bg-red-600 text-gray-200' 
                        : 'bg-white hover:bg-red-100 text-gray-700'
                    }`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className={`text-lg font-semibold ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {part.name}
                </h3>
                <p className={`mt-1 text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {part.description}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className={`font-bold ${
                    isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
                  }`}>
                    R$ {part.price.toFixed(2)}
                  </span>
                  <span className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Estoque: {part.quantity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredParts.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            isDarkMode={isDarkMode}
          />
        )}

        {editingPart && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className={`max-w-2xl w-full rounded-xl shadow-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } p-6`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-2xl font-semibold ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  Editar Peça
                </h2>
                <button
                  onClick={() => setEditingPart(null)}
                  className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}
                >
                  ✕
                </button>
              </div>
              <PartForm
                onSubmit={(updatedPart) => handleEditPart(updatedPart)}
                initialData={editingPart}
                buttonText="Salvar Alterações"
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
        )}

        {sellingPart && (
          <SellModal
            part={sellingPart}
            onClose={() => setSellingPart(null)}
            onConfirm={handleSell}
            isDarkMode={isDarkMode}
          />
        )}

        {deletingPart && (
          <DeleteModal
            part={deletingPart}
            onClose={() => setDeletingPart(null)}
            onConfirm={handleDeleteConfirm}
            isDarkMode={isDarkMode}
          />
        )}
      </div>
    </div>
  );
}