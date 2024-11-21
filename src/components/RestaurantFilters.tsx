import React from 'react';
import { Filter, Star, Clock } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
}

const sortOptions: FilterOption[] = [
  { id: 'rating', label: 'Les mieux notés' },
  { id: 'delivery_time', label: 'Livraison rapide' },
  { id: 'min_order', label: 'Commande minimum' },
  { id: 'distance', label: 'Distance' }
];

const priceRanges: FilterOption[] = [
  { id: 'low', label: '€' },
  { id: 'medium', label: '€€' },
  { id: 'high', label: '€€€' }
];

export default function RestaurantFilters() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="h-5 w-5 text-gray-500" />
        <h3 className="font-medium">Filtres</h3>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Trier par</h4>
          <div className="space-y-2">
            {sortOptions.map(option => (
              <label key={option.id} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="sort"
                  value={option.id}
                  className="text-orange-500 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-600">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Prix</h4>
          <div className="flex space-x-4">
            {priceRanges.map(range => (
              <button
                key={range.id}
                className="px-4 py-2 border rounded-md text-sm hover:bg-orange-50 hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Autres filtres</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded text-orange-500 focus:ring-orange-500"
              />
              <span className="text-sm text-gray-600">Livraison gratuite</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded text-orange-500 focus:ring-orange-500"
              />
              <span className="text-sm text-gray-600">Promotions</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded text-orange-500 focus:ring-orange-500"
              />
              <span className="text-sm text-gray-600">Nouveaux restaurants</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}