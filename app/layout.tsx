import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import FooterWrapper from "@/components/FooterWrapper";
import { CSPostHogProvider } from './providers'


export const metadata = {
  title: "Headshots AI",
  description: "Generate awesome headshots in minutes using AI",
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Plus+Jakarta+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="flex flex-col bg-[#F4F7FA] min-h-screen w-full overflow-x-hidden font-[Poppins]">
        <Navbar />
        <CSPostHogProvider>
        <main className="flex-1 flex flex-col w-full">
          {children}
        </main>
        </CSPostHogProvider>
        <FooterWrapper />
        <Toaster />
        <Analytics />        
      </body>
    </html>
  );
}