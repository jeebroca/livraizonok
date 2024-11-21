import React, { useState } from 'react';
import { Menu, PlusCircle, Clock, DollarSign } from 'lucide-react';

export default function RestaurantDashboard() {
  const [activeOrders, setActiveOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord Restaurant</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Commandes du jour</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenu du jour</p>
                <p className="text-2xl font-bold text-gray-900">386€</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Items au menu</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
              <Menu className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Commandes actives */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Commandes actives</h2>
            <span className="bg-orange-100 text-orange-600 py-1 px-3 rounded-full text-sm font-medium">
              3 en cours
            </span>
          </div>
          
          <div className="space-y-4">
            {/* Liste des commandes */}
          </div>
        </div>

        {/* Gestion du menu */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button className="flex items-center space-x-2 text-sm text-orange-600 hover:text-orange-700">
              <PlusCircle className="h-5 w-5" />
              <span>Ajouter un plat</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {/* Liste des plats */}
          </div>
        </div>
      </div>
    </div>
  );
}