import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from "@/types/supabase"; 
import LoginPage from "./components/Login";

export const dynamic = "force-dynamic";

export default function Page({ 
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const host = headers().get("host");

  return (
    <div className="flex flex-col flex-1 w-full h-[calc(100vh-73px)]">
      <LoginPage host={host} searchParams={searchParams} />
    </div>
  );
}
