import React from 'react';
import { Star, ThumbsUp, Flag } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
  orderDetails?: string;
}

interface ReviewsListProps {
  reviews: Review[];
  onHelpfulClick: (reviewId: string) => void;
  onReportClick: (reviewId: string) => void;
}

export default function ReviewsList({
  reviews,
  onHelpfulClick,
  onReportClick
}: ReviewsListProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Avis clients</h2>
        <div className="flex items-center">
          <Star className="h-5 w-5 text-yellow-400 mr-1" />
          <span className="font-medium">4.8</span>
          <span className="text-gray-500 ml-1">({reviews.length} avis)</span>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium text-gray-900">{review.author}</h3>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              {review.orderDetails && (
                <span className="text-sm text-gray-500">{review.orderDetails}</span>
              )}
            </div>

            <p className="mt-3 text-gray-600">{review.comment}</p>

            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <button
                onClick={() => onHelpfulClick(review.id)}
                className="flex items-center text-sm text-gray-500 hover:text-gray-700"
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span>Utile ({review.helpful})</span>
              </button>

              <button
                onClick={() => onReportClick(review.id)}
                className="flex items-center text-sm text-gray-500 hover:text-red-500"
              >
                <Flag className="h-4 w-4 mr-1" />
                <span>Signaler</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}