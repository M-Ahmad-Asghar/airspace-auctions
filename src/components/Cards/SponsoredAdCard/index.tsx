'use client'
import { Globe, MoreVertical } from 'lucide-react';


export interface SponsoredAdProps {
    id: string;
    image: string;
    title: string;
    description: string;
}

export function SponsoredAdCard({ image, title, description }: SponsoredAdProps) {
    return (
        <div className="bg-white max-w-[200px] rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Image Container */}
            <div className="relative">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-48 object-cover"
                />
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Sponsored Header */}
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-500">Sponsored</span>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                    </button>
                </div>

                {/* Main Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    {description}
                </p>

                {/* Discount Badge */}
                <div className="inline-flex items-center bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                    UP TO 25% OFF • 25%
                </div>
            </div>
        </div>
    );
}