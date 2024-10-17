'use client';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import NavItems from "./Navitems";
import UserMenu from "./UserMenu";
import final_Logo from "@/public/final_Logo.svg";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [credits, setCredits] = useState(null);
  const pathname = usePathname();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data: credits } = await supabase.from('credits').select('credits').eq('user_id', user.id).single();
        setCredits(credits);
      }
    };

    checkUser();
  }, [supabase]);

  const isHomePage = pathname === '/';

  return (
    <nav className="bg-white-100 shadow-sm rounded-full mx-4 my-2 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex-shrink-0">
            <div className="rounded-lg p-1 mr-2">
            <Image src={final_Logo} alt="Studio.ai logo"  className="rounded-sm" />
            </div>
          </Link>
          
          {isHomePage ? (
            <div className="hidden md:flex items-center space-x-6 flex-grow justify-end">
              <NavItems />
              {user ? (
                <UserMenu user={user} credits={credits?.credits ?? 0} />
              ) : (
                <Link href="/login">
                  <button className="text-gray-700 font-bold text-lg py-2 px-6 rounded font-jakarta hover:bg-gray-100 transition duration-300">
                    Login / Sign Up
                  </button>
                </Link>
              )}
            </div>
          ) : user ? (
            <div className="flex items-center space-x-6">
              <UserMenu user={user} credits={credits?.credits ?? 0} />
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
}