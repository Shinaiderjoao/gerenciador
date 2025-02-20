import React from 'react';

interface DeleteModalProps {
  part: {
    name: string;
  };
  onClose: () => void;
  onConfirm: () => void;
  isDarkMode: boolean;
}

export function DeleteModal({ part, onClose, onConfirm, isDarkMode }: DeleteModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`max-w-md w-full rounded-xl shadow-lg ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } p-6`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-semibold ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Confirmar Exclusão
          </h2>
          <button
            onClick={onClose}
            className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <p className={`${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Tem certeza que deseja excluir a peça <span className="font-semibold">{part.name}</span>?
            Esta ação não pode ser desfeita.
          </p>

          <div className="flex justify-end space-x-3">
            <button
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
              onClick={onConfirm}
              className={`px-4 py-2 rounded-lg ${
                isDarkMode
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 