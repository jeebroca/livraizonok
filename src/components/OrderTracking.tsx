import React from 'react';
import { Package, CheckCircle, Clock, ChefHat, Bike } from 'lucide-react';

interface OrderTrackingProps {
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY_FOR_PICKUP' | 'IN_DELIVERY' | 'DELIVERED';
  estimatedTime?: string;
}

export default function OrderTracking({ status, estimatedTime }: OrderTrackingProps) {
  const steps = [
    { key: 'CONFIRMED', label: 'Confirmée', icon: CheckCircle },
    { key: 'PREPARING', label: 'En préparation', icon: ChefHat },
    { key: 'READY_FOR_PICKUP', label: 'Prête', icon: Package },
    { key: 'IN_DELIVERY', label: 'En livraison', icon: Bike },
    { key: 'DELIVERED', label: 'Livrée', icon: CheckCircle }
  ];

  const currentStepIndex = steps.findIndex(step => step.key === status);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Suivi de commande</h3>
        {estimatedTime && (
          <div className="flex items-center text-orange-600">
            <Clock className="h-5 w-5 mr-2" />
            <span>Livraison estimée: {estimatedTime}</span>
          </div>
        )}
      </div>

      <div className="relative">
        <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-200 -translate-y-1/2" />
        <div 
          className="absolute left-0 top-1/2 h-1 bg-orange-500 -translate-y-1/2 transition-all duration-500"
          style={{ width: `${(currentStepIndex + 1) * 25}%` }}
        />
        
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <div key={step.key} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isActive 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-200 text-gray-400'
                  } ${
                    isCurrent ? 'ring-4 ring-orange-200' : ''
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`mt-2 text-sm ${
                  isActive ? 'text-orange-600 font-medium' : 'text-gray-500'
                }`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}