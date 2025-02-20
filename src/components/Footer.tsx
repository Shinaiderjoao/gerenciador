import React from 'react';

interface FooterProps {
  isDarkMode: boolean;
}

export function Footer({ isDarkMode }: FooterProps) {
  return (
    <footer className={`py-6 mt-auto ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="container mx-auto px-4 text-center">
        <p className={`text-sm ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          © {new Date().getFullYear()} Shinaider Carcaças - Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
} 