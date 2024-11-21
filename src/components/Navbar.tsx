import React, { useState } from 'react';
import { ShoppingBag, User, MapPin } from 'lucide-react';

interface NavbarProps {
  onSearch?: (query: string) => void;
  onSignupClick?: () => void;
}

export default function Navbar({ onSearch, onSignupClick }: NavbarProps) {
  const [address, setAddress] = useState('');

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-orange-600">LIVRAIZON</h1>
          </div>
          
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Entrez votre adresse de livraison"
                className="w-full px-4 py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-full">
              <ShoppingBag className="h-6 w-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                2
              </span>
            </button>
            <button 
              onClick={onSignupClick}
              className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors duration-200"
            >
              <User className="h-5 w-5" />
              <span>S'inscrire</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}