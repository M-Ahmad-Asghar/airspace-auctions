import React, { useState, useRef, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';
import Button from '../Button';

interface ProfileDropdownProps {
  className?: string;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ className }) => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    if (status === 'unauthenticated') {
      signIn('google');
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleSignOut = () => {
    signOut();
    setIsOpen(false);
  };

  const menuItems = [
    { label: 'Dashboard', href: '/dashboard', icon: '📊' },
    { label: 'My Listings', href: '/listings', icon: '📝' },
    { label: 'Saved Searches', href: '/saved-searches', icon: '🔍' },
    { label: 'Messages', href: '/messages', icon: '💬' },
    { label: 'Billing & Payments', href: '/billing', icon: '💳' },
    { label: 'Account Settings', href: '/settings', icon: '⚙️' },
    { label: 'Notifications', href: '/notifications', icon: '🔔' },
    { label: 'Support & Help', href: '/support', icon: '❓' },
  ];

  if (status === 'loading') {
    return (
      <div className={cn("flex items-center", className)}>
        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      <Button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
      >
        {session?.user?.image ? (
          <img
            src={session.user.image}
            alt={session.user.name || 'User'}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-[#305DB3] flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
        )}
        <svg 
          className={cn(
            "w-4 h-4 text-gray-600 transition-transform hidden md:block",
            isOpen && "rotate-180"
          )} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Button>

      {isOpen && session && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {/* User Info */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || 'User'}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#305DB3] flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {session.user?.name || 'User'}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {session.user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span className="mr-3 text-base">{item.icon}</span>
                {item.label}
              </a>
            ))}
          </div>

          {/* Sign Out */}
          <div className="border-t border-gray-100 py-2">
            <Button
              onClick={handleSignOut}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Log Out
            </Button>
          </div>
        </div>
      )}

      {!session && status === 'unauthenticated' && (
        <div className="hidden md:block ml-2">
          <Button variant="primary" size="sm" onClick={() => signIn('google')}>
            Sign In
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;