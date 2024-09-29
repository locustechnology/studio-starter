'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { packConfig, packOrder } from '@/app/config/pack-config';


const packsIsEnabled = process.env.NEXT_PUBLIC_TUNE_TYPE === "packs";

interface Pack {
  id: string;
  name: string;
  image_url: string;
}

export default function Index() {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    console.log("packsIsEnabled:", packsIsEnabled);
    if (!packsIsEnabled) {
      console.log("Redirecting to overview");
      router.push('/overview');
      return;
    }

    const fetchPacks = async () => {
      try {
        console.log("Fetching packs...");
        // Update the fetch URL to match the file structure
        const response = await fetch('/astria/packs');
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        
        // Sort packs based on packOrder and packConfig
        const sortedPacks = data.sort((a: Pack, b: Pack) => {
          const orderA = (packConfig as any)[a.name]?.order ?? packOrder.length;
          const orderB = (packConfig as any)[b.name]?.order ?? packOrder.length;
          return orderA - orderB;
        });
        
        setPacks(sortedPacks);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(`An error occurred while fetching packs: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPacks();
  }, [router]);

  console.log("Rendering component, packs:", packs);

  if (!packsIsEnabled) return <div>Packs are not enabled</div>;
  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="flex flex-col gap-4 my-8">
        <Link href="/overview" className="text-sm w-fit">
          <Button variant="outline">
            <FaArrowLeft className="mr-2" />
            Go Back
          </Button>
        </Link>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Packs Gallery</CardTitle>
            <CardDescription>
              Choose the type of images you would like to create.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {packs.length === 0 ? (
              <div className="text-center py-10">No packs available</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packs.map((pack) => (
                  <div key={pack.id} className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-md">
                    <Image 
                      src={pack.image_url}
                      alt={pack.name}
                      layout="fill"
                      objectFit="cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                      <h2 className="text-lg font-semibold">{pack.name}</h2>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}