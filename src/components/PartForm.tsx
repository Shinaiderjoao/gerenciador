import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import { Part } from '../types';

interface PartFormProps {
  onSubmit: (part: Omit<Part, 'id' | 'created_at' | 'updated_at'>) => void;
  initialData?: Part;
  buttonText: string;
  isDarkMode?: boolean;
}

export function PartForm({ onSubmit, initialData, buttonText, isDarkMode }: PartFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    quantity: initialData?.quantity || '',
    price: initialData?.price || '',
    image_url: initialData?.image_url || '',
  });
  const [previewUrl, setPreviewUrl] = useState(initialData?.image_url || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const partData = {
        name: formData.name,
        description: formData.description,
        quantity: Number(formData.quantity),
        price: Number(formData.price),
        image_url: formData.image_url,
      };
      
      console.log('Enviando dados:', partData); // Debug
      await onSubmit(partData);
      
      // Limpar formulário após sucesso
      setFormData({
        name: '',
        description: '',
        quantity: '',
        price: '',
        image_url: '',
      });
      setPreviewUrl('');
    } catch (error) {
      console.error('Erro no formulário:', error);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Verifica o tamanho do arquivo (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert('Arquivo muito grande. Tamanho máximo: 5MB');
          return;
        }

        // Verifica o tipo do arquivo
        if (!file.type.startsWith('image/')) {
          alert('Por favor, selecione apenas imagens');
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          // Limita o tamanho da string base64
          if (base64String.length > 1024 * 1024) { // 1MB em caracteres
            alert('Imagem muito grande após conversão. Por favor, use uma imagem menor.');
            return;
          }
          setFormData({ ...formData, image_url: base64String });
          setPreviewUrl(base64String);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Erro ao processar imagem:', error);
        alert('Erro ao processar imagem. Tente novamente.');
      }
    }
  };

  // Adiciona preview da imagem
  const imagePreview = previewUrl && (
    <div className="mt-2">
      <img 
        src={previewUrl} 
        alt="Preview" 
        className="max-w-xs h-auto rounded-lg shadow-lg"
        style={{ maxHeight: '200px', objectFit: 'contain' }} 
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image Upload */}
      <div className="space-y-2">
        <label className={`block text-sm font-medium ${
          isDarkMode ? 'text-gray-200' : 'text-gray-700'
        }`}>
          Imagem da Peça
        </label>
        <div
          className={`relative border-2 border-dashed rounded-lg p-4 transition-colors cursor-pointer ${
            isDarkMode 
              ? 'border-gray-600 hover:border-yellow-400' 
              : 'border-gray-300 hover:border-yellow-500'
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
          <div className="flex flex-col items-center justify-center space-y-2">
            <Upload className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
            <span className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Clique para selecionar uma imagem
            </span>
          </div>
        </div>
        {imagePreview}
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className={`block text-sm font-medium ${
          isDarkMode ? 'text-gray-200' : 'text-gray-700'
        }`}>
          Nome da Peça
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`mt-1 block w-full rounded-lg shadow-sm px-4 py-2 ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600 text-gray-200 focus:border-yellow-400 focus:ring-yellow-400' 
              : 'bg-white border-gray-300 focus:border-yellow-500 focus:ring-yellow-500'
          }`}
          required
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className={`block text-sm font-medium ${
          isDarkMode ? 'text-gray-200' : 'text-gray-700'
        }`}>
          Descrição
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className={`mt-1 block w-full rounded-lg shadow-sm px-4 py-2 ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600 text-gray-200 focus:border-yellow-400 focus:ring-yellow-400' 
              : 'bg-white border-gray-300 focus:border-yellow-500 focus:ring-yellow-500'
          }`}
          rows={3}
          required
        />
      </div>

      {/* Quantity and Price */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="quantity" className={`block text-sm font-medium ${
            isDarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>
            Quantidade
          </label>
          <input
            type="number"
            id="quantity"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            className={`mt-1 block w-full rounded-lg shadow-sm px-4 py-2 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-gray-200 focus:border-yellow-400 focus:ring-yellow-400' 
                : 'bg-white border-gray-300 focus:border-yellow-500 focus:ring-yellow-500'
            }`}
            min="0"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className={`block text-sm font-medium ${
            isDarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>
            Preço
          </label>
          <div className="relative mt-1">
            <span className={`absolute inset-y-0 left-0 pl-3 flex items-center ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              R$
            </span>
            <input
              type="number"
              id="price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className={`block w-full rounded-lg pl-10 shadow-sm px-4 py-2 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-gray-200 focus:border-yellow-400 focus:ring-yellow-400' 
                  : 'bg-white border-gray-300 focus:border-yellow-500 focus:ring-yellow-500'
              }`}
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className={`w-full py-3 px-4 rounded-lg transition-colors font-medium ${
          isDarkMode
            ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900'
            : 'bg-yellow-500 hover:bg-yellow-600 text-white'
        }`}
      >
        {buttonText}
      </button>
    </form>
  );
}