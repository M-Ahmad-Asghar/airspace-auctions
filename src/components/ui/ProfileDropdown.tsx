import * as React from "react";
import { UserProfileMenuItem } from "@/components/types/index";

const MENU: UserProfileMenuItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "My Listings", href: "/my-listings" },
  { label: "Saved Searches", href: "/saved-searches" },
  { label: "Messages", href: "/messages" },
  { label: "Billing & Payments", href: "/billing" },
  { label: "Account Settings", href: "/settings" },
  { label: "Notifications", href: "/notifications" },
  { label: "Support & Help", href: "/support" },
];

interface ProfileDropdownProps {
  avatar: string;
  name: string;
  email: string;
  onLogout: () => void;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  avatar,
  name,
  email,
  onLogout,
}) => (
  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg p-6 z-50">
    <div className="flex items-center mb-6">
      <img src={avatar} alt={name} className="w-12 h-12 rounded-full border mr-3" />
      <div>
        <div className="font-bold text-lg">{name}</div>
        <div className="text-gray-500 text-sm">{email}</div>
      </div>
    </div>
    <nav className="flex flex-col gap-4">
      {MENU.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="text-gray-700 hover:text-[#305DB3] transition-colors text-base"
        >
          {item.label}
        </a>
      ))}
      <button
        onClick={onLogout}
        className="text-gray-700 hover:text-red-600 transition-colors text-base text-left mt-2"
      >
        Log Out
      </button>
    </nav>
  </div>
);