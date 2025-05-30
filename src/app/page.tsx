'use client'
import { PromotionalBanner, PromotionalBannerProps } from '@/components/Cards/SaleCard/PromotionalBanner';
import { ServiceCard, ServiceCardProps } from '@/components/Cards/ServiceCard';
import { SponsoredAdCard, SponsoredAdProps } from '@/components/Cards/SponsoredAdCard';
import { useCallback, useEffect, useState } from 'react';

export default function CardsPage() {
  const [items, setItems] = useState<(ServiceCardProps | SponsoredAdProps | PromotionalBannerProps)[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const aircraftImages = [
    "https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ];

  const userImages = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",

  ];


  // Sample data generator
  const generateSampleItems = (pageNum: number) => {
    const items: (ServiceCardProps | SponsoredAdProps | PromotionalBannerProps)[] = [];
    const startIndex = (pageNum - 1) * 16; // Changed to 16 to accommodate 4 rows of 4 cards each

    // Generate promotional banner first (every 17 items to appear less frequently)
    if (startIndex % 17 === 0) {
      items.push({
        id: `promo-${startIndex}`,
        title: "Flash Sale on Business Jets!",
        description: "Save big on top-tier aircraft with unbeatable prices.",
        buttonText: "GRAB THE OFFER",
        image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      });
    }

    // Generate 4 rows of 4 cards each
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        const index = startIndex + (row * 4) + col;

        // Every 4th card (last card in row) should be sponsored
        if (col === 3) {
          items.push({
            id: `ad-${index}`,
            image: aircraftImages[index % aircraftImages.length],
            title: "Private Jet Sale",
            description: "Save big on top-tier aircraft with unbeatable prices. Limited stock available – grab your dream jet before it's gone!"
          });
        }
        // Regular service cards for positions 1, 2, 3 in each row
        else {
          items.push({
            id: `service-${index}`,
            image: aircraftImages[index % aircraftImages.length],
            title: "Strike a yoga pose",
            price: 26.93 + (index * 0.1),
            rating: 4.5 + (index % 5) * 0.1,
            reviews: 145 + index,
            userName: "Joseph Andrew",
            userImage: userImages[index % userImages.length],
            location: `Location ${index}`,
            timeAgo: `${index % 7 + 1} day${index % 7 !== 0 ? 's' : ''} ago`,
            isSponsored: false, // Only sponsored ads are sponsored, not service cards
            hasDiscount: index % 5 === 0,
            discountPercent: 25
          });
        }
      }
    }

    return items;
  };

  // Load initial data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const initialItems = generateSampleItems(1);
      setItems(initialItems);
      setLoading(false);
    }, 500);
  }, []);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;

    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 1000) {
      setLoading(true);
      setTimeout(() => {
        const newItems = generateSampleItems(page + 1);
        setItems(prev => [...prev, ...newItems]);
        setPage(prev => prev + 1);
        setLoading(false);

        // Stop loading after 5 pages for demo
        if (page >= 5) {
          setHasMore(false);
        }
      }, 1000);
    }
  }, [loading, hasMore, page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Render item based on type
  const renderItem = (item: ServiceCardProps | SponsoredAdProps | PromotionalBannerProps) => {
    if ('price' in item) {
      return <ServiceCard key={item.id} {...item} />;
    } else if ('buttonText' in item) {
      return (
        <div key={item.id} className="col-span-full flex gap-6 overflow-x-auto">
          <PromotionalBanner {...item} />
          <PromotionalBanner {...item} />
          <PromotionalBanner {...item} />
        </div>
      );
    } else {
      return <SponsoredAdCard key={item.id} {...item} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Grid Container - matching the expected 4-column layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map(renderItem)}
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* End Message */}
        {!hasMore && !loading && (
          <div className="text-center py-8">
            <p className="text-gray-500">No more items to load</p>
          </div>
        )}
      </main>
    </div>
  );
}