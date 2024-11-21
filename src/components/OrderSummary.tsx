import React from 'react';
import { Clock, MapPin, Receipt, CreditCard } from 'lucide-react';

interface OrderSummaryProps {
  order: {
    id: string;
    items: Array<{
      name: string;
      quantity: number;
      price: number;
      customizations?: string[];
    }>;
    restaurant: {
      name: string;
      address: string;
    };
    delivery: {
      address: string;
      estimatedTime: string;
      fee: number;
    };
    paymentMethod: string;
    total: number;
  };
}

export default function OrderSummary({ order }: OrderSummaryProps) {
  const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Récapitulatif de la commande</h2>

      <div className="space-y-6">
        <div className="border-b pb-4">
          <div className="flex items-center text-gray-600 mb-2">
            <Receipt className="h-5 w-5 mr-2" />
            <span className="font-medium">Détails de la commande</span>
          </div>
          <div className="space-y-2 mt-3">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <span className="text-orange-600 font-medium">{item.quantity}x</span>{' '}
                  <span>{item.name}</span>
                  {item.customizations?.length > 0 && (
                    <p className="text-sm text-gray-500 ml-6">
                      {item.customizations.join(', ')}
                    </p>
                  )}
                </div>
                <span>{(item.price * item.quantity).toFixed(2)}€</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-b pb-4">
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-5 w-5 mr-2" />
            <span className="font-medium">Détails de livraison</span>
          </div>
          <div className="space-y-2 mt-3">
            <div>
              <p className="text-sm font-medium">Restaurant</p>
              <p className="text-sm text-gray-600">{order.restaurant.name}</p>
              <p className="text-sm text-gray-600">{order.restaurant.address}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Adresse de livraison</p>
              <p className="text-sm text-gray-600">{order.delivery.address}</p>
            </div>
            <div className="flex items-center text-sm text-orange-600">
              <Clock className="h-4 w-4 mr-1" />
              <span>Livraison estimée : {order.delivery.estimatedTime}</span>
            </div>
          </div>
        </div>

        <div className="border-b pb-4">
          <div className="flex items-center text-gray-600 mb-2">
            <CreditCard className="h-5 w-5 mr-2" />
            <span className="font-medium">Paiement</span>
          </div>
          <p className="text-sm text-gray-600">{order.paymentMethod}</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Sous-total</span>
            <span>{subtotal.toFixed(2)}€</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Frais de livraison</span>
            <span>{order.delivery.fee.toFixed(2)}€</span>
          </div>
          <div className="flex justify-between font-semibold text-lg pt-2">
            <span>Total</span>
            <span>{order.total.toFixed(2)}€</span>
          </div>
        </div>
      </div>
    </div>
  );
}