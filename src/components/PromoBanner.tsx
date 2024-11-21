import React from 'react';
import { ArrowRight, Gift, Utensils, Clock } from 'lucide-react';

export default function PromoBanner() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl shadow-lg">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative flex flex-col justify-between p-6 h-full">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              -50% sur votre 1ère commande ! 🎉
            </h2>
            <p className="text-white/90 text-sm max-w-md">
              Code : <span className="font-bold bg-white/20 px-2 py-1 rounded">BIENVENUE50</span>
            </p>
          </div>
          <button className="mt-4 flex items-center space-x-2 bg-white px-6 py-3 rounded-full text-orange-600 font-semibold hover:bg-orange-50 transition-colors duration-200 w-fit">
            <span>Commander</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative flex flex-col justify-between p-6 h-full">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Restaurants Partenaires 🍽️
            </h2>
            <p className="text-white/90 text-sm max-w-md">
              Rejoignez notre réseau et développez votre activité
            </p>
          </div>
          <button className="mt-4 flex items-center space-x-2 bg-white px-6 py-3 rounded-full text-blue-600 font-semibold hover:bg-blue-50 transition-colors duration-200 w-fit">
            <span>Devenir Partenaire</span>
            <Utensils className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden bg-gradient-to-r from-green-500 to-teal-500 rounded-xl shadow-lg">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative flex flex-col justify-between p-6 h-full">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Livraison Express 🛵
            </h2>
            <p className="text-white/90 text-sm max-w-md">
              Livraison en 30 minutes ou moins sur toute la ville
            </p>
          </div>
          <button className="mt-4 flex items-center space-x-2 bg-white px-6 py-3 rounded-full text-green-600 font-semibold hover:bg-green-50 transition-colors duration-200 w-fit">
            <span>Suivre ma commande</span>
            <Clock className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}