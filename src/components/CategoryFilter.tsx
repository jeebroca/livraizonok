import React from 'react';
import { Pizza, Coffee, UtensilsCrossed, Soup, Sandwich } from 'lucide-react';

const categories = [
  { id: 'tout', name: 'Tout', icon: UtensilsCrossed },
  { id: 'pizza', name: 'Pizza', icon: Pizza },
  { id: 'bebeles', name: 'Bébélés', icon: UtensilsCrossed },
  { id: 'bokits', name: 'Bokits', icon: Sandwich },
  { id: 'plats-antillais', name: 'Plats Antillais', icon: UtensilsCrossed },
  { id: 'soupes', name: 'Soupes', icon: Soup },
  { id: 'burgers', name: 'Burgers', icon: Sandwich },
  { id: 'fastfood', name: 'FastFood', icon: UtensilsCrossed },
  { id: 'desserts', name: 'Desserts', icon: Coffee }
];

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex space-x-4 overflow-x-auto py-4 scrollbar-hide">
      {categories.map(({ id, name, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onSelectCategory(name)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200
            ${selectedCategory === name
              ? 'bg-orange-500 text-white shadow-lg transform scale-105'
              : 'bg-gray-100 text-gray-800 hover:bg-orange-100 hover:text-orange-600'
            }`}
        >
          <Icon className="h-5 w-5" />
          <span>{name}</span>
        </button>
      ))}
    </div>
  );
}