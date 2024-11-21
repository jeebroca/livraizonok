import React from 'react';
import { Package, CheckCircle, Clock, ChefHat, Bike, MapPin } from 'lucide-react';

interface OrderStatusProps {
  orderId: string;
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY_FOR_PICKUP' | 'IN_DELIVERY' | 'DELIVERED';
  restaurant: {
    name: string;
    address: string;
    phone: string;
  };
  delivery: {
    estimatedTime: string;
    address: string;
    driverName?: string;
    driverPhone?: string;
  };
}

export default function OrderStatus({
  orderId,
  status,
  restaurant,
  delivery
}: OrderStatusProps) {
  const steps = [
    { key: 'CONFIRMED', label: 'Commande confirmée', icon: CheckCircle, time: '12:30' },
    { key: 'PREPARING', label: 'En préparation', icon: ChefHat, time: '12:35' },
    { key: 'READY_FOR_PICKUP', label: 'Prête pour la livraison', icon: Package, time: '12:45' },
    { key: 'IN_DELIVERY', label: 'En cours de livraison', icon: Bike, time: '12:50' },
    { key: 'DELIVERED', label: 'Livrée', icon: CheckCircle, time: '13:05' }
  ];

  const currentStep = steps.findIndex(step => step.key === status);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Commande #{orderId.slice(-6)}
        </h2>
        <div className="mt-2 flex items-center text-orange-600">
          <Clock className="h-5 w-5 mr-2" />
          <span>Livraison estimée : {delivery.estimatedTime}</span>
        </div>
      </div>

      <div className="space-y-8 relative before:absolute before:left-[17px] before:top-0 before:h-full before:w-0.5 before:bg-gray-200">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index <= currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={step.key} className="relative flex items-start">
              <div className={`absolute left-0 w-9 h-9 rounded-full flex items-center justify-center ${
                isCompleted 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-200 text-gray-400'
              } ${isCurrent ? 'ring-4 ring-orange-100' : ''}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="ml-12">
                <div className="flex items-center">
                  <p className={`font-medium ${isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                    {step.label}
                  </p>
                  {step.time && (
                    <span className="ml-2 text-sm text-gray-500">
                      {step.time}
                    </span>
                  )}
                </div>
                {isCurrent && (
                  <p className="mt-1 text-sm text-gray-500">
                    {status === 'PREPARING' && "Le restaurant prépare votre commande"}
                    {status === 'IN_DELIVERY' && delivery.driverName && (
                      <>
                        Votre livreur {delivery.driverName} est en route
                        {delivery.driverPhone && ` - ${delivery.driverPhone}`}
                      </>
                    )}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 space-y-4 border-t pt-6">
        <div className="flex items-start space-x-3">
          <Store className="h-5 w-5 text-gray-400 mt-1" />
          <div>
            <h3 className="font-medium text-gray-900">{restaurant.name}</h3>
            <p className="text-sm text-gray-500">{restaurant.address}</p>
            <p className="text-sm text-gray-500">{restaurant.phone}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <MapPin className="h-5 w-5 text-gray-400 mt-1" />
          <div>
            <h3 className="font-medium text-gray-900">Adresse de livraison</h3>
            <p className="text-sm text-gray-500">{delivery.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}