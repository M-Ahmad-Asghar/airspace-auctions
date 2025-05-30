import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Button from '../Button';
import SearchDropdown from '../SearchDropdown';
import ProfileDropdown from '../ProfileDropdown';
import HeaderDesign from './HeaderDesign';
import { NavigationHeader } from './NavigationHeader';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Aircraft', href: '/aircraft' },
    { label: 'Parts', href: '/parts' },
    { label: 'Events', href: '/events' },
    { label: 'Real Estate', href: '/real-estate' },
    { label: 'Places', href: '/places' },
    { label: 'Services', href: '/services' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <HeaderDesign />
      <NavigationHeader /></>
  );
};

export default Header;