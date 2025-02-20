import React from 'react';
import { FileSpreadsheet, FileText } from 'lucide-react';

interface ReportFormatModalProps {
  onClose: () => void;
  onConfirm: (format: 'csv' | 'xlsx') => void;
  isDarkMode: boolean;
}

export function ReportFormatModal({ onClose, onConfirm, isDarkMode }: ReportFormatModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`max-w-md w-full rounded-xl shadow-lg ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } p-6`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-semibold ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Formato do Relatório
          </h2>
          <button
            onClick={onClose}
            className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onConfirm('csv')}
            className={`flex flex-col items-center justify-center p-6 rounded-lg transition-colors ${
              isDarkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <FileText size={48} className="mb-3" />
            <span className="font-medium">CSV</span>
            <span className={`text-sm mt-1 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Arquivo de texto
            </span>
          </button>

          <button
            onClick={() => onConfirm('xlsx')}
            className={`flex flex-col items-center justify-center p-6 rounded-lg transition-colors ${
              isDarkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <FileSpreadsheet size={48} className="mb-3" />
            <span className="font-medium">Excel</span>
            <span className={`text-sm mt-1 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Planilha Excel
            </span>
          </button>
        </div>
      </div>
    </div>
  );
} 