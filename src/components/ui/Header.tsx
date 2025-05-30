'use client'
import * as React from "react";
import Link from "next/link";
import { Menu, Search, Mic, Bell } from "lucide-react";
import { CommonButton } from "./CommonButton";
import { SearchDropdown } from "./SearchDropdown";
import { ProfileDropdown } from "./ProfileDropdown";
import { useSession } from "next-auth/react";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Aircraft", href: "/aircraft" },
  { label: "Parts", href: "/parts" },
  { label: "Events", href: "/events" },
  { label: "Real Estate", href: "/real-estate" },
  { label: "Places", href: "/places" },
  { label: "Services", href: "/services" },
];

export const Header: React.FC = () => {
  // These would be fetched/managed by state in a real app
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user || {
    name: "username",
    email: "username@gmail.com",
    image: "/avatar.png",
  };

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center mr-4">
          <img src="/logo.svg" alt="airplanedeals.com" className="h-8 w-auto" />
          <span className="ml-2 font-black text-2xl tracking-tight">airplane<span className="text-[#305DB3]">deals</span>.com</span>
        </Link>
        {/* Search */}
        <div className="flex-1 flex items-center relative">
          <button
            onClick={() => setSearchOpen((v) => !v)}
            className="flex items-center w-full max-w-md bg-white border rounded-lg px-4 py-2 shadow-sm text-gray-700 focus:outline-none"
          >
            <Search className="mr-2" />
            <span className="flex-1 text-left text-gray-600">Search here</span>
            <Mic className="ml-2" />
          </button>
          {searchOpen && (
            <SearchDropdown
              recent={[
                { id: "1", image: "/aircraft1.jpg", title: "Piper PA-28 ...", subtitle: "2 New Listing" },
                { id: "2", image: "/aircraft2.jpg", title: "Piper PA-28 ...", subtitle: "2 New Listing" },
              ]}
              onRemove={() => {}}
            />
          )}
        </div>
        {/* Post button */}
        <CommonButton className="ml-4 hidden md:inline-flex" variant="primary">
          + Post
        </CommonButton>
        {/* Message/Notification icon */}
        <button className="ml-4 relative">
          <Bell />
          <span className="absolute top-0 right-0 w-2 h-2 bg-[#F0AD0D] rounded-full border-2 border-white" />
        </button>
        {/* Profile */}
        <div className="relative ml-4">
          <button onClick={() => setProfileOpen((v) => !v)}>
            <img
              src={user.image as any}
              alt={user.name  as any}
              className="w-10 h-10 rounded-full border-2 border-[#F0AD0D]"
            />
          </button>
          {profileOpen && (
            <ProfileDropdown
              avatar={user.image  as any}
              name={user.name  as any}
              email={user.email  as any}
              onLogout={() => {}}
            />
          )}
        </div>
      </div>
      {/* Blue Navbar */}
      <nav className="hidden md:flex bg-[#305DB3] text-white px-4">
        <ul className="flex gap-8 mx-auto py-2">
          {NAV_LINKS.map((item) => (
            <li key={item.label}>
              <Link href={item.href} className="font-medium hover:underline">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};