import React from 'react';
import { Star, Clock, Heart, MapPin, TrendingUp } from 'lucide-react';

interface RestaurantCardProps {
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  minOrder: string;
  promos?: string[];
  distance?: string;
  trending?: boolean;
}

export default function RestaurantCard({
  name,
  image,
  cuisine,
  rating,
  deliveryTime,
  minOrder,
  promos = [],
  distance = "1.2 km",
  trending = false,
}: RestaurantCardProps) {
  const [isLiked, setIsLiked] = React.useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-48">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 left-4 p-2 rounded-full bg-white/90 hover:bg-white transition-colors duration-200 shadow-md"
        >
          <Heart 
            className={`h-5 w-5 transition-colors duration-200 ${
              isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>
        <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-full text-sm font-medium flex items-center shadow-md">
          <Star className="h-4 w-4 text-yellow-400 mr-1" />
          {rating}
        </div>
        {trending && (
          <div className="absolute bottom-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center shadow-md">
            <TrendingUp className="h-4 w-4 mr-1" />
            Populaire
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{name}</h3>
        <p className="text-gray-600 text-sm mb-3">{cuisine}</p>
        
        {promos.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {promos.map((promo) => (
              <span 
                key={promo}
                className="px-2 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded-full"
              >
                {promo}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {deliveryTime}
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {distance}
            </div>
          </div>
          <div className="font-medium">Min. {minOrder}</div>
        </div>
      </div>
    </div>
  );
}