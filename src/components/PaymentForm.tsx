import React, { useState } from 'react';
import { CreditCard, Lock } from 'lucide-react';

interface PaymentFormProps {
  total: number;
  onSubmit: (paymentDetails: any) => void;
}

export default function PaymentForm({ total, onSubmit }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState('card');

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Paiement</h2>
        <div className="flex items-center text-green-600">
          <Lock className="h-5 w-5 mr-2" />
          <span className="text-sm">Paiement sécurisé</span>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setPaymentMethod('card')}
            className={`flex-1 p-4 border rounded-lg ${
              paymentMethod === 'card' 
                ? 'border-orange-500 bg-orange-50' 
                : 'border-gray-200 hover:border-orange-200'
            }`}
          >
            <CreditCard className={`h-6 w-6 mx-auto ${
              paymentMethod === 'card' ? 'text-orange-500' : 'text-gray-400'
            }`} />
            <span className={`block mt-2 text-sm font-medium ${
              paymentMethod === 'card' ? 'text-orange-600' : 'text-gray-500'
            }`}>
              Carte bancaire
            </span>
          </button>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit({
            // Form data
          });
        }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Numéro de carte
            </label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date d'expiration
              </label>
              <input
                type="text"
                placeholder="MM/AA"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Code de sécurité
              </label>
              <input
                type="text"
                placeholder="CVC"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom sur la carte
            </label>
            <input
              type="text"
              placeholder="JEAN DUPONT"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Sous-total</span>
              <span>{(total - 2.99).toFixed(2)}€</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Frais de livraison</span>
              <span>2.99€</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-2">
              <span>Total</span>
              <span>{total.toFixed(2)}€</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200"
          >
            Payer {total.toFixed(2)}€
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          En cliquant sur "Payer", vous acceptez nos{' '}
          <a href="#" className="text-orange-600 hover:text-orange-700">
            conditions générales
          </a>
        </p>
      </div>
    </div>
  );
}