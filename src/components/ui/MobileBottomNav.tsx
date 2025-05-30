import * as React from "react";
import Link from "next/link";
import { Home, Plane, Cog, Building2, User } from "lucide-react";

const NAV = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/aircraft", icon: Plane, label: "Aircraft" },
  { href: "/parts", icon: Cog, label: "Parts" },
  { href: "/real-estate", icon: Building2, label: "Real Estate" },
  { href: "/profile", icon: User, label: "Profile" },
];

export const MobileBottomNav: React.FC = () => (
  <nav className="bg-[#305DB3] flex justify-between items-center py-2 px-2 shadow-lg">
    {NAV.map((item) => (
      <Link key={item.label} href={item.href} className="flex flex-col items-center flex-1 text-white">
        <item.icon size={28} />
        {/* You can add: <span className="text-xs">{item.label}</span> if desired */}
      </Link>
    ))}
  </nav>
);