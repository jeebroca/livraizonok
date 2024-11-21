import React, { useState } from 'react';
import { Menu, Search } from 'lucide-react';
import MenuItemCard from './MenuItemCard';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}

interface RestaurantMenuProps {
  categories: string[];
  items: MenuItem[];
  onAddToCart: (item: MenuItem, quantity: number, customizations: string[]) => void;
}

export default function RestaurantMenu({
  categories,
  items,
  onAddToCart
}: RestaurantMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState('Tout');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'Tout' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <div className="sticky top-0 bg-white z-10 pb-4">
        <div className="flex items-center space-x-4 mb-6">
          <Menu className="h-6 w-6 text-orange-500" />
          <h2 className="text-2xl font-bold">Menu</h2>
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Rechercher un plat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
          {['Tout', ...categories].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-orange-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredItems.map((item) => (
          <MenuItemCard
            key={item.id}
            {...item}
            onAddToCart={(quantity, customizations) => onAddToCart(item, quantity, customizations)}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucun plat ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
}</content>