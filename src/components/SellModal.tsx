import React, { useState } from 'react';

interface SellModalProps {
  part: {
    id: string;
    name: string;
    quantity: number;
  };
  onClose: () => void;
  onConfirm: (quantity: number) => void;
  isDarkMode: boolean;
}

export function SellModal({ part, onClose, onConfirm, isDarkMode }: SellModalProps) {
  const [quantity, setQuantity] = useState<string>('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const quantityNum = Number(quantity);
    
    if (!quantity || quantityNum <= 0) {
      setError('A quantidade deve ser maior que zero');
      return;
    }
    if (quantityNum > part.quantity) {
      setError('Quantidade maior que o estoque disponível');
      return;
    }
    onConfirm(quantityNum);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setQuantity(value);
      setError('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`max-w-md w-full rounded-xl shadow-lg ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } p-6`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-semibold ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Registrar Venda - {part.name}
          </h2>
          <button
            onClick={onClose}
            className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Quantidade Disponível: {part.quantity}
            </label>
            <input
              type="text"
              value={quantity}
              onChange={handleQuantityChange}
              placeholder="Digite a quantidade"
              className={`w-full px-3 py-2 rounded-lg ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg ${
                isDarkMode
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg ${
                isDarkMode
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900'
                  : 'bg-yellow-500 hover:bg-yellow-600 text-white'
              }`}
            >
              Confirmar Venda
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 