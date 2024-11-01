'use client';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import NavItems from "./Navitems";
import UserMenu from "./UserMenu";
import final_Logo from "@/public/new_logo.svg";
import { User } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';

// Add this interface to match what UserMenu expects
interface UserMenuProps {
  user: {
    email: string;
  };
  credits: number;
}

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [credits, setCredits] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClientComponentClient<Database>();

  const isHomePage = pathname === '/';

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      // Only fetch credits if user exists
      if (user) {
        const { data: creditsData, error } = await supabase
          .from('credits')
          .select('credits')
          .eq('user_id', user.id)
          .single();
  
        if (error) {
          console.log('Error fetching credits:', error);
        } else {
          setCredits(creditsData?.credits ?? 0);
        }
      }
    };
  
    checkUser();
  }, [supabase]);

  const getUserMenuProps = (user: User | null, credits: number | null): UserMenuProps | null => {
    if (!user || !user.email) return null;
    return {
      user: { email: user.email },
      credits: credits ?? 0
    };
  };

  return (
    <div className="mt-1">
      <nav className="bg-white shadow-sm font-poppins mx-auto px-4 flex flex-col sm:flex-row items-center justify-between" 
        style={{
          maxWidth: '1276px',
          minHeight: '61px',
          borderRadius: '64px',
        }}>
        <div className="flex items-center justify-between w-full sm:w-auto">
          <Link href={user ? '/overview' : '/'} className="flex-shrink-0">
            <div className="mr-2">
              <Image src={final_Logo} alt="Studio.ai logo" width={120} height={80} className="rounded-sm" />
            </div>
          </Link>
          
          <button 
            className="sm:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
        
        <div className="hidden sm:flex items-center space-x-6">
          {isHomePage && <NavItems />}
        </div>

        <div className="hidden sm:flex items-center space-x-4">
          {user ? (
            (() => {
              const userMenuProps = getUserMenuProps(user, credits);
              return userMenuProps ? <UserMenu {...userMenuProps} /> : null;
            })()
          ) : (
            <Link href="/login">
              <button className="bg-[#5B16FE] text-white font-bold text-lg py-2 px-6 rounded-full font-jakarta hover:bg-[#5B16FE]/90 transition duration-300">
                Login / Sign Up
              </button>
            </Link>
          )}
        </div>
      </nav>

      {isMenuOpen && (
        <div className="sm:hidden bg-white shadow-md mt-2 py-4 px-6 rounded-b-[24px]">
          {isHomePage && <NavItems isMobile />}
          {user ? (
            (() => {
              const userMenuProps = getUserMenuProps(user, credits);
              return userMenuProps ? (
                <div className="mt-4">
                  <UserMenu {...userMenuProps} />
                </div>
              ) : null;
            })()
          ) : (
            <div className="mt-4 flex justify-center">
              <Link href="/login">
                <button className="w-full bg-[#5B16FE] text-white font-bold text-lg py-2 px-6 rounded-full font-jakarta hover:bg-[#5B16FE]/90 transition duration-300">
                  Login / Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
