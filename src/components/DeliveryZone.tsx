import React from 'react';
import { MapPin } from 'lucide-react';

const deliveryZones = [
  { zone: 'Fort-de-France', time: '20-30 min', fee: 2.99 },
  { zone: 'Schœlcher', time: '25-35 min', fee: 3.99 },
  { zone: 'Le Lamentin', time: '30-40 min', fee: 3.99 },
  { zone: 'Saint-Joseph', time: '35-45 min', fee: 4.99 }
];

export default function DeliveryZone() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <MapPin className="h-5 w-5 text-gray-400 mr-2" />
        <h3 className="font-semibold">Zones de livraison</h3>
      </div>

      <div className="space-y-4">
        {deliveryZones.map(({ zone, time, fee }) => (
          <div key={zone} className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-900">{zone}</p>
              <p className="text-sm text-gray-500">{time}</p>
            </div>
            <span className="text-orange-600 font-medium">{fee.toFixed(2)}€</span>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-gray-500">
        Les temps de livraison sont estimés et peuvent varier en fonction du trafic et des conditions météorologiques.
      </p>
    </div>
  );
}