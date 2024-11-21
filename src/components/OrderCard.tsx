import React from 'react';
import { Clock, MapPin, Receipt, ChefHat } from 'lucide-react';

interface OrderCardProps {
  orderId: string;
  restaurantName: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  status: string;
  total: number;
  orderTime: string;
  deliveryAddress: string;
}

export default function OrderCard({
  orderId,
  restaurantName,
  items,
  status,
  total,
  orderTime,
  deliveryAddress
}: OrderCardProps) {
  const getStatusColor = (status: string) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      CONFIRMED: 'bg-blue-100 text-blue-800',
      PREPARING: 'bg-purple-100 text-purple-800',
      READY_FOR_PICKUP: 'bg-indigo-100 text-indigo-800',
      IN_DELIVERY: 'bg-orange-100 text-orange-800',
      DELIVERED: 'bg-green-100 text-green-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      PENDING: 'En attente',
      CONFIRMED: 'Confirmée',
      PREPARING: 'En préparation',
      READY_FOR_PICKUP: 'Prête',
      IN_DELIVERY: 'En livraison',
      DELIVERED: 'Livrée'
    };
    return labels[status] || status;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{restaurantName}</h3>
          <p className="text-sm text-gray-500">Commande #{orderId.slice(-6)}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
          {getStatusLabel(status)}
        </span>
      </div>

      <div className="space-y-4">
        <div className="border-t border-b border-gray-100 py-4">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span className="text-orange-500 font-medium mr-2">{item.quantity}x</span>
                <span>{item.name}</span>
              </div>
              <span className="text-gray-600">{item.price.toFixed(2)}€</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center font-semibold">
          <span>Total</span>
          <span className="text-lg">{total.toFixed(2)}€</span>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            <span>Commandé à {orderTime}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{deliveryAddress}</span>
          </div>
        </div>

        {status === 'DELIVERED' ? (
          <button className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-200">
            Commander à nouveau
          </button>
        ) : (
          <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors duration-200">
            Suivre la commande
          </button>
        )}
      </div>
    </div>
  );
}