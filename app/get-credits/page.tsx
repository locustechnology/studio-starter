'use client';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PricingComponent from '@/components/PricingSection';
import { User } from '@supabase/supabase-js';

export default function GetCreditsPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      } else {
        router.push('/login');
      }
    };

    checkUser();
  }, [supabase, router]);

  if (!user) {
    return null; // or a loading spinner
  }

  return <PricingComponent />;
}
