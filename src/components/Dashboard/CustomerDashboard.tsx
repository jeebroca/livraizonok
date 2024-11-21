import React from 'react';
import { Clock, MapPin, Receipt } from 'lucide-react';

export default function CustomerDashboard() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Mes commandes</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Commandes totales</p>
                <p className="text-2xl font-bold text-gray-900">15</p>
              </div>
              <Receipt className="h-8 w-8 text-orange-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En cours</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Adresses sauvegardées</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <MapPin className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Commande en cours</h2>
          <div className="space-y-4">
            {/* Détails de la commande en cours */}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Historique des commandes</h2>
          <div className="space-y-4">
            {/* Liste des commandes passées */}
          </div>
        </div>
      </div>
    </div>
  );
}