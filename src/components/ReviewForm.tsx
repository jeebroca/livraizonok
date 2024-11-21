import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface ReviewFormProps {
  orderId: string;
  restaurantName: string;
  onSubmit: (review: {
    rating: number;
    comment: string;
    orderId: string;
  }) => void;
}

export default function ReviewForm({ orderId, restaurantName, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">
        Évaluer votre commande chez {restaurantName}
      </h3>

      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">Note</p>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => setRating(star)}
              className="focus:outline-none"
            >
              <Star
                className={`h-8 w-8 ${
                  star <= (hoveredRating || rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Votre avis
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
          placeholder="Partagez votre expérience..."
        />
      </div>

      <button
        onClick={() => onSubmit({ rating, comment, orderId })}
        disabled={!rating}
        className={`w-full py-2 px-4 rounded-md font-medium ${
          rating
            ? 'bg-orange-500 text-white hover:bg-orange-600'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
      >
        Envoyer mon avis
      </button>
    </div>
  );
}