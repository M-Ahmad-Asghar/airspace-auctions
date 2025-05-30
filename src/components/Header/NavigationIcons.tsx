'use clienrt'
import React, { useState } from "react";
import { ChatIcon } from "./icons/ChatIcon";
import { ProfileIcon } from "./icons/ProfileIcon";
import ProfileDropdown from "../ProfileDropdown";
import { useSession } from "next-auth/react";
import UserProfilePopup from "./UserProfilePopup";

export const NavigationIcons = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const { data: session } = useSession();

  const user = session?.user || {
    name: "username",
    email: "username@gmail.com",
    image: "/avatar.png",
  };
  return (
    <div className="relative">
      <button aria-label="Chat notifications">
        <ChatIcon />
      </button>
      <button aria-label="User profile">
        <UserProfilePopup />
      </button>

    </div>
  );
};
