import Login from '../login/components/Login';  // Make sure this import is correct
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <Login/>;
  }

  return <div className="flex w-full flex-col px-4 lg:px-40">{children}</div>;
}
