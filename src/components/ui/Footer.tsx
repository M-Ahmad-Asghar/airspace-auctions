import * as React from "react";
import { MobileBottomNav } from "./MobileBottomNav";
import Link from "next/link";

export const Footer: React.FC = () => (
  <footer className="relative bg-[#F5F5F5] border-t border-gray-200 pt-10 pb-20 md:pb-6">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row md:justify-between gap-8">
        {/* Logo + Contact + Social */}
        <div className="flex flex-col gap-4 min-w-[210px]">
          <img src="/logo.svg" alt="airplanedeals.com" className="h-8 w-auto mb-2" />
          <a href="mailto:Ops@airplanedeals.com" className="flex items-center gap-2 text-black hover:underline">
            <span className="material-icons">mail</span> Ops@airplanedeals.com
          </a>
          {/* Social Icons */}
          <div className="flex gap-3">
            {/* Replace with your SVG icon components as needed */}
            <a href="#"><img src="/icons/facebook.svg" alt="Facebook" className="w-6 h-6" /></a>
            <a href="#"><img src="/icons/x.svg" alt="X" className="w-6 h-6" /></a>
            <a href="#"><img src="/icons/youtube.svg" alt="YouTube" className="w-6 h-6" /></a>
            <a href="#"><img src="/icons/pinterest.svg" alt="Pinterest" className="w-6 h-6" /></a>
            <a href="#"><img src="/icons/linkedin.svg" alt="LinkedIn" className="w-6 h-6" /></a>
            <a href="#"><img src="/icons/instagram.svg" alt="Instagram" className="w-6 h-6" /></a>
          </div>
          {/* App Badges */}
          <div className="mt-4">
            <div className="font-semibold text-xs mb-2">SHOP FASTER WITH THE APP</div>
            <div className="flex gap-2">
              <a href="#"><img src="/badges/googleplay.svg" alt="Google Play" className="h-10" /></a>
              <a href="#"><img src="/badges/appstore.svg" alt="App Store" className="h-10" /></a>
            </div>
          </div>
        </div>
        {/* Navigation Columns */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <div className="font-bold underline mb-2">Back to Top</div>
            <ul className="space-y-1">
              <li><Link href="/search">Search</Link></li>
              <li><Link href="/aircraft">Aircraft</Link></li>
              <li><Link href="/parts">Parts</Link></li>
              <li><Link href="/events">Events</Link></li>
              <li><Link href="/real-estate">Real Estate</Link></li>
              <li><Link href="/places">Places</Link></li>
              <li><Link href="/services">Services</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-bold underline mb-2">Help & Support</div>
            <ul className="space-y-1">
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/how-to">How To</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/site-map">Site Map</Link></li>
              <li><Link href="/">Home</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-bold underline mb-2">Security & Legal</div>
            <ul className="space-y-1">
              <li><Link href="/security">Security Center</Link></li>
              <li><Link href="/terms">Terms of Use</Link></li>
              <li><Link href="/advertiser-agreement">Advertiser Agreement</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-300 mt-8 pt-4 text-center text-sm text-gray-700">
        © 2025 <span className="font-bold">Airplane Deals</span>. All Rights Reserved.
      </div>
    </div>
    {/* Mobile Bottom Nav */}
    <div className="fixed md:hidden bottom-0 left-0 w-full z-50">
      <MobileBottomNav />
    </div>
  </footer>
);