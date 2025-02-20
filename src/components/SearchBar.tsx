import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { Part } from '../types';

interface SearchBarProps {
  parts: Part[];
  onSearch: (searchTerm: string) => void;
  isDarkMode: boolean;
}

export function SearchBar({ parts, onSearch, isDarkMode }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Part[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fechar sugestões quando clicar fora
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    onSearch(term);

    // Filtrar sugestões
    if (term.trim()) {
      const filtered = parts.filter(part =>
        part.name.toLowerCase().includes(term.toLowerCase()) ||
        part.description.toLowerCase().includes(term.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5)); // Limitar a 5 sugestões
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (part: Part) => {
    setSearchTerm(part.name);
    onSearch(part.name);
    setShowSuggestions(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Buscar peças..."
          className={`w-full px-4 py-2 pl-10 rounded-lg transition-colors ${
            isDarkMode
              ? 'bg-gray-700 text-gray-100 placeholder-gray-400 border-gray-600'
              : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300'
          } border focus:outline-none focus:ring-2 focus:ring-yellow-500`}
        />
        <Search
          size={20}
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}
        />
      </div>

      {/* Sugestões */}
      {showSuggestions && suggestions.length > 0 && (
        <div className={`absolute z-10 w-full mt-1 rounded-lg shadow-lg overflow-hidden ${
          isDarkMode ? 'bg-gray-700' : 'bg-white'
        }`}>
          {suggestions.map(part => (
            <button
              key={part.id}
              onClick={() => handleSuggestionClick(part)}
              className={`w-full text-left px-4 py-2 transition-colors ${
                isDarkMode
                  ? 'text-gray-200 hover:bg-gray-600'
                  : 'text-gray-900 hover:bg-gray-100'
              }`}
            >
              <div className="font-medium">{part.name}</div>
              <div className={`text-sm truncate ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {part.description}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 