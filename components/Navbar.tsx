'use client';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import NavItems from "./Navitems";
import UserMenu from "./UserMenu";
import final_Logo from "@/public/final_Logo.svg";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [credits, setCredits] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClientComponentClient();

  const isHomePage = pathname === '/';

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data: creditsData } = await supabase.from('credits').select('credits').eq('user_id', user.id).single();
        setCredits(creditsData?.credits ?? 0);
      }
    };

    checkUser();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div className="mt-1">
      <nav className="bg-white shadow-sm font-poppins mx-auto px-4 flex flex-col sm:flex-row items-center justify-between" style={{
        maxWidth: '1276px',
        minHeight: '61px',
        borderRadius: '64px',
      }}>
        <div className="flex items-center justify-between w-full sm:w-auto">
          <Link href="/" className="flex-shrink-0">
            <div className="mr-2">
              <Image src={final_Logo} alt="Studio.ai logo" width={120} height={40} className="rounded-sm" />
            </div>
          </Link>
          
          {/* Mobile menu button */}
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
            <UserMenu user={user} credits={credits ?? 0} handleLogout={handleLogout} />
          ) : (
            <Link href="/login">
              <button className="bg-[#5B16FE] text-white font-bold text-lg py-2 px-6 rounded-full font-jakarta hover:bg-[#5B16FE] transition duration-300">
                Login / Sign Up
              </button>
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white shadow-md mt-2 py-4 px-6 rounded-b-[24px]">
          {isHomePage && <NavItems isMobile />}
          {user ? (
            <div className="mt-4 flex flex-col items-center">
              <UserMenu user={user} credits={credits ?? 0} handleLogout={handleLogout} />
            </div>
          ) : (
            <div className="mt-4 flex justify-center">
              <Link href="/login">
                <button className="w-full bg-purple-600 text-white font-bold text-lg py-2 px-6 rounded-full font-jakarta hover:bg-purple-700 transition duration-300">
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
