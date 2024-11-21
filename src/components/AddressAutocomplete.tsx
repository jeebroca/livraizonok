import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react';

interface AddressAutocompleteProps {
  onSelect: (address: string) => void;
}

export default function AddressAutocomplete({ onSelect }: AddressAutocompleteProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([
    'Fort-de-France, Martinique',
    'Le Lamentin, Martinique',
    'Schoelcher, Martinique',
    'Saint-Joseph, Martinique'
  ]);

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Entrez votre adresse de livraison"
          className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {query && (
        <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {suggestions
            .filter(s => s.toLowerCase().includes(query.toLowerCase()))
            .map((suggestion, index) => (
              <button
                key={index}
                className="w-full text-left px-4 py-2 hover:bg-orange-50 focus:bg-orange-50 focus:outline-none"
                onClick={() => {
                  onSelect(suggestion);
                  setQuery(suggestion);
                }}
              >
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                  <span>{suggestion}</span>
                </div>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}