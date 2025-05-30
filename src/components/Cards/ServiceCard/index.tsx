'use client';
import React from 'react';
import { Heart, Share, MapPin, Star } from 'lucide-react';

export interface ServiceCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
  rating: number;
  reviews: number;
  userName: string;
  userImage: string;
  location: string;
  timeAgo: string;
  isSponsored?: boolean;
  hasDiscount?: boolean;
  discountPercent?: number;
}

export function ServiceCard({ 
  image, 
  title, 
  price, 
  rating, 
  reviews, 
  userName, 
  userImage, 
  location, 
  timeAgo,
  isSponsored = false,
  hasDiscount = false,
  discountPercent = 0
}: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Image Container */}
      <div className="relative">
        <img 
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
            UP TO {discountPercent}% OFF
          </div>
        )}
        
        {/* Heart Icon */}
        <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors">
          <Heart className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Share */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-base font-semibold text-gray-900 flex-1 mr-2 leading-tight">
            {title}
          </h3>
          <button className="p-1 hover:bg-gray-100 rounded transition-colors flex-shrink-0">
            <Share className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Price and Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-bold text-orange-500">
            ${price.toFixed(2)}
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="font-medium text-gray-900 text-sm">{rating.toFixed(1)}</span>
            <span className="text-gray-500 text-sm">({reviews})</span>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <img 
              src={userImage}
              alt={userName}
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h4 className="font-medium text-gray-900 truncate text-sm">{userName}</h4>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{location}</span>
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-500 ml-2 flex-shrink-0">
            {timeAgo}
          </div>
        </div>
      </div>
    </div>
  );
}