import React, { useState } from 'react';
import {
    MdDashboard,
    MdList,
    MdBookmark,
    MdMessage,
    MdPayment,
    MdSettings,
    MdNotifications,
    MdHelp,
    MdLogout,
    MdClose
} from 'react-icons/md';
import { ProfileIcon } from './icons/ProfileIcon';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const UserProfilePopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const menuItems = [
        { icon: MdDashboard, label: 'Dashboard' },
        { icon: MdList, label: 'My Listings' },
        { icon: MdBookmark, label: 'Saved Searches' },
        { icon: MdMessage, label: 'Messages' },
        { icon: MdPayment, label: 'Billing & Payments' },
        { icon: MdSettings, label: 'Account Settings' },
        { icon: MdNotifications, label: 'Notifications' },
        { icon: MdHelp, label: 'Support & Help' },
    ];
    const { data: session } = useSession();
    const user = session?.user || {
        name: "username",
        email: "username@gmail.com",
        image: "/avatar.png",
    };

    if (!isOpen) {
        return (
            <div className="fixed top-6 right-8" onClick={() => setIsOpen(true)}>
                <ProfileIcon />
            </div>
        );
    }
 const handleLogout = async () => {
    console.log('Starting Google auth...');
    
    const result = await signOut({ 
      callbackUrl: '/auth',
      redirect: true
    });
    
    console.log('Google auth result:', result);
  };
    return (
        <div className="fixed right-0   top-2 flex items-start justify-start p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-80 max-h-screen overflow-y-auto">
                {/* Header with close button */}
                <div className="flex justify-end p-4 pb-0">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <MdClose size={24} />
                    </button>
                </div>

                {/* User Profile Section */}
                <div className="px-6 pb-6">
                    <div className="flex items-center space-x-4 mb-8">
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face&auto=format"
                                alt="Profile"
                                className="w-16 h-16 rounded-full object-cover border-4 border-blue-100"
                            />
                        </div>
                        <div>
                            <h2 className="text-xl text-start font-bold text-gray-900">{user?.name}</h2>
                            <p className="text-gray-600 text-sm">{user.email}</p>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <nav className="space-y-2">
                        {menuItems.map((item, index) => {
                            const IconComponent = item.icon;
                            return (
                                <button
                                    key={index}
                                    className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors group"
                                >
                                    <IconComponent
                                        size={20}
                                        className="text-gray-500 group-hover:text-blue-500 transition-colors"
                                    />
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>

                    {/* Divider */}
                    <div className="border-t border-gray-200 my-4"></div>

                    {/* Log Out Button */}
                    <button onClick={handleLogout
                 } className="w-full flex items-center space-x-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors group">
                        <MdLogout
                            size={20}
                            className="text-red-500 group-hover:text-red-600 transition-colors"
                        />
                        <span className="font-medium">Log Out</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePopup;