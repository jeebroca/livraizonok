import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="relative max-w-md w-full">
      <input
        type="text"
        placeholder="Rechercher des restaurants ou des cuisines..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
      />
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
    </div>
  );
}