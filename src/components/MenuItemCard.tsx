import React, { useState } from 'react';
import { Plus, Minus, Info } from 'lucide-react';

interface MenuItemProps {
  name: string;
  description: string;
  price: number;
  image?: string;
  onAddToCart: (quantity: number, customizations: string[]) => void;
}

export default function MenuItemCard({
  name,
  description,
  price,
  image,
  onAddToCart
}: MenuItemProps) {
  const [quantity, setQuantity] = useState(1);
  const [showCustomization, setShowCustomization] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const customizationOptions = [
    "Épicé",
    "Sans piment",
    "Sauce créole",
    "Supplément fromage",
    "Extra légumes"
  ];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {image && (
        <div className="h-48 overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{name}</h3>
          <span className="font-bold text-orange-600">{price.toFixed(2)}€</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
            >
              <Minus className="h-4 w-4 text-gray-600" />
            </button>
            <span className="font-medium">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
            >
              <Plus className="h-4 w-4 text-gray-600" />
            </button>
          </div>
          
          <button 
            onClick={() => setShowCustomization(!showCustomization)}
            className="flex items-center text-sm text-orange-600 hover:text-orange-700"
          >
            <Info className="h-4 w-4 mr-1" />
            Personnaliser
          </button>
        </div>

        {showCustomization && (
          <div className="space-y-2 mb-4 border-t pt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Options :</p>
            {customizationOptions.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedOptions([...selectedOptions, option]);
                    } else {
                      setSelectedOptions(selectedOptions.filter(o => o !== option));
                    }
                  }}
                  className="rounded text-orange-500 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-600">{option}</span>
              </label>
            ))}
          </div>
        )}

        <button
          onClick={() => onAddToCart(quantity, selectedOptions)}
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors duration-200"
        >
          Ajouter au panier • {(price * quantity).toFixed(2)}€
        </button>
      </div>
    </div>
  );
}</content>