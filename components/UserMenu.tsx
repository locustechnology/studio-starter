"use client";

import { useState } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from 'next/navigation';

interface UserMenuProps {
  user: {
    email: string;
  };
  credits: number;
}

export default function UserMenu({ user, credits }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsOpen(false);
      router.refresh();
      // No need to call router.push('/') here as it's handled by the auth state change listener in Navbar
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold font-poppins">
          {user?.email?.[0]?.toUpperCase() || '?'}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          <div className="px-4 py-2 text-sm text-gray-700 font-poppins border-b">
            {user.email}
          </div>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 font-jakarta"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}