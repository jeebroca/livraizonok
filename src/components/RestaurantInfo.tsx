import React from 'react';
import { Star, Clock, MapPin, Phone, Info } from 'lucide-react';

interface RestaurantInfoProps {
  restaurant: {
    name: string;
    description: string;
    cuisine: string;
    address: string;
    phone: string;
    rating: number;
    reviewCount: number;
    deliveryTime: string;
    minOrder: string;
    distance: string;
  };
}

export default function RestaurantInfo({ restaurant }: RestaurantInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{restaurant.name}</h1>
          <p className="text-gray-600 mt-1">{restaurant.cuisine}</p>
        </div>
        <div className="flex items-center bg-orange-50 px-3 py-1 rounded-full">
          <Star className="h-5 w-5 text-yellow-400 mr-1" />
          <span className="font-medium text-orange-600">{restaurant.rating}</span>
          <span className="text-gray-500 text-sm ml-1">
            ({restaurant.reviewCount} avis)
          </span>
        </div>
      </div>

      <p className="text-gray-600 mb-6">{restaurant.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center text-gray-600">
          <Clock className="h-5 w-5 mr-2" />
          <div>
            <p className="text-sm font-medium">Temps de livraison</p>
            <p className="text-sm">{restaurant.deliveryTime}</p>
          </div>
        </div>

        <div className="flex items-center text-gray-600">
          <Info className="h-5 w-5 mr-2" />
          <div>
            <p className="text-sm font-medium">Commande minimum</p>
            <p className="text-sm">{restaurant.minOrder}</p>
          </div>
        </div>

        <div className="flex items-center text-gray-600">
          <MapPin className="h-5 w-5 mr-2" />
          <div>
            <p className="text-sm font-medium">Distance</p>
            <p className="text-sm">{restaurant.distance}</p>
          </div>
        </div>

        <div className="flex items-center text-gray-600">
          <Phone className="h-5 w-5 mr-2" />
          <div>
            <p className="text-sm font-medium">Téléphone</p>
            <p className="text-sm">{restaurant.phone}</p>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-start">
          <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
          <div>
            <p className="font-medium text-gray-900">Adresse</p>
            <p className="text-gray-600 mt-1">{restaurant.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}