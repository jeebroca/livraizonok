import React from 'react';
import { Clock } from 'lucide-react';

interface OpeningHours {
  day: string;
  hours: string;
  isToday: boolean;
}

const openingHours: OpeningHours[] = [
  { day: 'Lundi', hours: '11:00 - 22:00', isToday: false },
  { day: 'Mardi', hours: '11:00 - 22:00', isToday: false },
  { day: 'Mercredi', hours: '11:00 - 22:00', isToday: true },
  { day: 'Jeudi', hours: '11:00 - 22:00', isToday: false },
  { day: 'Vendredi', hours: '11:00 - 23:00', isToday: false },
  { day: 'Samedi', hours: '11:00 - 23:00', isToday: false },
  { day: 'Dimanche', hours: '12:00 - 22:00', isToday: false }
];

export default function RestaurantHours() {
  const currentHour = new Date().getHours();
  const isOpen = currentHour >= 11 && currentHour < 22;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="font-semibold">Horaires d'ouverture</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          isOpen 
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {isOpen ? 'Ouvert' : 'Fermé'}
        </span>
      </div>

      <div className="space-y-3">
        {openingHours.map(({ day, hours, isToday }) => (
          <div
            key={day}
            className={`flex justify-between items-center ${
              isToday ? 'text-orange-600 font-medium' : 'text-gray-600'
            }`}
          >
            <span>{day}</span>
            <span>{hours}</span>
          </div>
        ))}
      </div>
    </div>
  );
}