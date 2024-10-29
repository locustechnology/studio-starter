import type { Metadata } from "next";
import "./globals.css";
import "@/styles/fonts.css";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import FooterWrapper from "@/components/FooterWrapper";


export const metadata = {
  title: "Headshots AI",
  description: "Generate awesome headshots in minutes using AI",
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="flex flex-col bg-[#F4F7FA] min-h-screen w-full overflow-x-hidden font-[Poppins]">
        <Navbar />
        <main className="flex-1 flex flex-col w-full">
          {children}
        </main>
        <FooterWrapper />
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}