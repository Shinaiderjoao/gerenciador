import React from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onOpenSidebar: () => void;
  isDarkMode: boolean;
}

export function Header({ onOpenSidebar, isDarkMode }: HeaderProps) {
  return (
    <header className={`${
      isDarkMode ? 'bg-gray-800 shadow-gray-900' : 'bg-white'
    } shadow-md transition-colors duration-200`}>
      <div className="container mx-auto px-4 py-3">
        <button
          onClick={onOpenSidebar}
          className={`${
            isDarkMode 
              ? 'text-gray-200 hover:text-yellow-400' 
              : 'text-gray-700 hover:text-yellow-600'
          } transition-colors`}
        >
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
}