import React, { useState } from 'react';
import { Download, FileSpreadsheet } from 'lucide-react';
import { Part } from '../types';
import { SearchBar } from '../components/SearchBar';
import { ReportFormatModal } from '../components/ReportFormatModal';
import * as XLSX from 'xlsx';

interface ReportProps {
  parts: Part[];
  isDarkMode: boolean;
}

interface SaleReport {
  name: string;
  totalSold: number;
  originalQuantity: number;
  currentQuantity: number;
}

export function Report({ parts, isDarkMode }: ReportProps) {
  const [selectedParts, setSelectedParts] = useState<Part[]>([]);
  const [filteredParts, setFilteredParts] = useState<Part[]>(parts);
  const [showFormatModal, setShowFormatModal] = useState(false);

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

  const togglePartSelection = (part: Part) => {
    setSelectedParts(prev => {
      const isSelected = prev.find(p => p.id === part.id);
      if (isSelected) {
        return prev.filter(p => p.id !== part.id);
      } else {
        return [...prev, part];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedParts.length === filteredParts.length) {
      // Se todas já estão selecionadas, desseleciona todas
      setSelectedParts([]);
    } else {
      // Seleciona todas as peças filtradas
      setSelectedParts(filteredParts);
    }
  };

  const handleGenerateReport = (format: 'csv' | 'xlsx') => {
    if (selectedParts.length === 0) {
      alert('Selecione pelo menos uma peça para gerar o relatório');
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0];
    const totalValue = selectedParts.reduce((sum, part) => sum + (part.price * part.quantity), 0);

    // Preparar dados
    const data = [
      ['Nome da Peça', 'Quantidade Vendida', 'Preço Unitário (R$)', 'Valor Total (R$)'],
      ...selectedParts.map(part => [
        part.name,
        part.quantity,
        part.price,
        part.price * part.quantity
      ]),
      ['', '', 'TOTAL:', totalValue]
    ];

    // Criar workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);

    // Configurar largura das colunas
    ws['!cols'] = [
      { wch: 40 }, // Nome da Peça
      { wch: 20 }, // Quantidade
      { wch: 20 }, // Preço Unitário
      { wch: 20 }  // Valor Total
    ];

    // Adicionar formatação de número para as colunas de preço
    for (let i = 2; i <= data.length; i++) {
      ws[`C${i}`] = { t: 'n', v: data[i-1][2], z: '#,##0.00' };
      ws[`D${i}`] = { t: 'n', v: data[i-1][3], z: '#,##0.00' };
    }

    // Adicionar a worksheet ao workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Relatório de Vendas');

    if (format === 'csv') {
      // Gerar CSV
      const csv = XLSX.utils.sheet_to_csv(ws, {
        FS: ';', // Separador de campo
        RS: '\n', // Separador de linha
      });

      const blob = new Blob(['\ufeff' + csv], { 
        type: 'text/csv;charset=utf-8' 
      });

      // Download do arquivo
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `relatorio_vendas_${currentDate}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } else {
      // Gerar XLSX
      try {
        XLSX.writeFile(wb, `relatorio_vendas_${currentDate}.xlsx`, {
          bookType: 'xlsx',
          type: 'array',
          cellDates: false,
          cellStyles: true,
          compression: true
        });
      } catch (error) {
        console.error('Erro ao gerar arquivo Excel:', error);
        alert('Erro ao gerar arquivo Excel. Por favor, tente novamente.');
      }
    }

    setShowFormatModal(false);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className={`text-3xl font-bold ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Relatório de Vendas
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSelectAll}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                isDarkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <span>
                {selectedParts.length === filteredParts.length
                  ? 'Desselecionar Todas'
                  : 'Selecionar Todas'
                }
              </span>
            </button>
            <button
              onClick={() => setShowFormatModal(true)}
              disabled={selectedParts.length === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                selectedParts.length === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : isDarkMode
                    ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900'
                    : 'bg-yellow-500 hover:bg-yellow-600 text-white'
              }`}
            >
              <FileSpreadsheet size={20} />
              <span>Gerar Relatório</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <SearchBar
            parts={parts}
            onSearch={handleSearch}
            isDarkMode={isDarkMode}
          />
          <div className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {selectedParts.length} peça(s) selecionada(s)
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredParts.map(part => (
            <div
              key={part.id}
              onClick={() => togglePartSelection(part)}
              className={`p-4 rounded-lg cursor-pointer transition-colors ${
                isDarkMode
                  ? selectedParts.find(p => p.id === part.id)
                    ? 'bg-yellow-500 text-gray-900'
                    : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                  : selectedParts.find(p => p.id === part.id)
                    ? 'bg-yellow-500 text-white'
                    : 'bg-white text-gray-900 hover:bg-gray-50'
              } shadow-lg`}
            >
              <h3 className="font-semibold">{part.name}</h3>
              <p className={`text-sm mt-1 ${
                selectedParts.find(p => p.id === part.id)
                  ? isDarkMode ? 'text-gray-800' : 'text-gray-100'
                  : isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Quantidade atual: {part.quantity}
              </p>
            </div>
          ))}
        </div>

        {showFormatModal && (
          <ReportFormatModal
            onClose={() => setShowFormatModal(false)}
            onConfirm={handleGenerateReport}
            isDarkMode={isDarkMode}
          />
        )}
      </div>
    </div>
  );
} 