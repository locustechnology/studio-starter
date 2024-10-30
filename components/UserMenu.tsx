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
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="relative flex items-center space-x-4">
      <button 
        onClick={() => router.push('/get-credits')}
        className="flex items-center bg-gray-100 text-[#5B16FE] px-4 py-2 rounded-full hover:bg-gray-200 transition-all duration-300"
      >
        <svg 
          className="w-4 h-4 mr-2" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" 
            fill="currentColor"
          />
        </svg>
        <span className="font-poppins">{credits} Credits</span>
      </button>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <div className="w-8 h-8 bg-[#5B16FE] rounded-full flex items-center justify-center text-white font-bold font-poppins">
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
    </div>
  );
}