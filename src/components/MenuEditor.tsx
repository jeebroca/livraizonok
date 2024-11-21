import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Image } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  isAvailable: boolean;
}

interface MenuEditorProps {
  items: MenuItem[];
  onAddItem: (item: Omit<MenuItem, 'id'>) => void;
  onUpdateItem: (id: string, item: Partial<MenuItem>) => void;
  onDeleteItem: (id: string) => void;
}

export default function MenuEditor({
  items,
  onAddItem,
  onUpdateItem,
  onDeleteItem
}: MenuEditorProps) {
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const categories = [
    'Bébélés',
    'Bokits',
    'Plats Antillais',
    'Soupes',
    'Pizza',
    'Burgers',
    'FastFood',
    'Desserts'
  ];

  const MenuItemForm = ({ item, onSubmit, onCancel }) => (
    <form onSubmit={onSubmit} className="space-y-4 bg-gray-50 p-4 rounded-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nom du plat</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          defaultValue={item?.name}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          rows={3}
          defaultValue={item?.description}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Prix (€)</label>
          <input
            type="number"
            step="0.01"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            defaultValue={item?.price}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Catégorie</label>
          <select
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            defaultValue={item?.category}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
        >
          {item ? 'Mettre à jour' : 'Ajouter'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-600 hover:text-gray-800"
        >
          Annuler
        </button>
      </div>
    </form>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Menu du restaurant</h2>
        <button
          onClick={() => setIsAddingItem(true)}
          className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
        >
          <Plus className="h-5 w-5" />
          <span>Ajouter un plat</span>
        </button>
      </div>

      {isAddingItem && (
        <MenuItemForm
          item={null}
          onSubmit={(e) => {
            e.preventDefault();
            // Handle form submission
            setIsAddingItem(false);
          }}
          onCancel={() => setIsAddingItem(false)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(item => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow-md flex justify-between items-start"
          >
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{item.description}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-semibold text-orange-600">{item.price.toFixed(2)}€</span>
                <span className="text-sm text-gray-500">{item.category}</span>
              </div>
            </div>

            <div className="flex space-x-2 ml-4">
              <button
                onClick={() => setEditingItem(item)}
                className="text-gray-400 hover:text-orange-500"
              >
                <Edit2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDeleteItem(item.id)}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}