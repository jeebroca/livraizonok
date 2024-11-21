import React, { useState } from 'react';
import { MapPin, Package, TrendingUp } from 'lucide-react';

export default function DriverDashboard() {
  const [isAvailable, setIsAvailable] = useState(true);
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord Livreur</h1>
          <button 
            onClick={() => setIsAvailable(!isAvailable)}
            className={`px-4 py-2 rounded-full font-medium ${
              isAvailable 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}
          >
            {isAvailable ? 'Disponible' : 'Indisponible'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Livraisons du jour</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
              <Package className="h-8 w-8 text-orange-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Gains du jour</p>
                <p className="text-2xl font-bold text-gray-900">64€</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Distance parcourue</p>
                <p className="text-2xl font-bold text-gray-900">42 km</p>
              </div>
              <MapPin className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Livraisons en cours</h2>
        <div className="space-y-4">
          {/* Liste des livraisons */}
        </div>
      </div>
    </div>
  );
}