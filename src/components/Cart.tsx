import React from 'react';
import { ShoppingBag, X, ChevronUp, ChevronDown } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  customizations: string[];
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export default function Cart({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 2.99;
  const total = subtotal + deliveryFee;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <ShoppingBag className="h-6 w-6 text-orange-500 mr-2" />
          <h2 className="text-lg font-semibold">Votre panier</h2>
        </div>
        <span className="text-sm text-gray-500">{items.length} articles</span>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Votre panier est vide</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      {item.customizations.length > 0 && (
                        <p className="text-sm text-gray-500 mt-1">
                          {item.customizations.join(', ')}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="flex items-center mt-2">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="text-gray-500 hover:text-orange-500"
                      >
                        <ChevronDown className="h-5 w-5" />
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="text-gray-500 hover:text-orange-500"
                      >
                        <ChevronUp className="h-5 w-5" />
                      </button>
                    </div>
                    <span className="ml-4 font-medium">
                      {(item.price * item.quantity).toFixed(2)}€
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Sous-total</span>
              <span>{subtotal.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Frais de livraison</span>
              <span>{deliveryFee.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-2">
              <span>Total</span>
              <span>{total.toFixed(2)}€</span>
            </div>
          </div>

          <button
            onClick={onCheckout}
            className="w-full mt-6 bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200"
          >
            Commander maintenant
          </button>
        </>
      )}
    </div>
  );
}</content>