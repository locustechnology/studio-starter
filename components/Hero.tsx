'use client'
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import lock from "@/public/logo/lock.svg"
import circul from "@/public/logo/circul.svg"
import mdi from "@/public/logo/mdi.svg"
import tick from "@/public/logo/tick.svg"

interface HeadshotCardProps {
  imageUrl: string;
}

const HeadshotCard: React.FC<HeadshotCardProps> = ({ imageUrl }) => (
  <div className="w-[120px] sm:w-[162px] h-[180px] sm:h-[246px] rounded-[18.69px] overflow-hidden flex-shrink-0 relative">
    <img src={imageUrl} alt="AI Headshot" className="w-full h-full object-cover" />
  </div>
);

interface FeatureItemProps {
  Icon: string;
  text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ Icon, text }) => (
  <div className="flex items-center space-x-2">
    <Image src={Icon} alt="Feature icon" width={20} height={20} />
    <span className="text-xs sm:text-sm text-gray-600">{text}</span>
  </div>
);

export default function AIHeadshotsLandingPage() {
  const headshots = [
    "/Carosal/image.svg",
    "/Carosal/image1.svg",
    "/Carosal/image2.svg",
    "/Carosal/image3.svg",
    "/Carosal/image4.svg",
    "/Carosal/image5.svg",
    "/Carosal/image.svg",
  ];

  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let scrollPosition = 0;
    const scrollSpeed = 1;
    const carouselWidth = carousel.scrollWidth / 2;

    const scroll = () => {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= carouselWidth) {
        scrollPosition = 0;
      }
      carousel.scrollLeft = scrollPosition;
      requestAnimationFrame(scroll);
    };

    const animation = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animation);
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-between py-4 sm:py-8 gap-6 sm:gap-12 px-4 sm:px-8">
      <div className="text-center w-full max-w-[982px] flex flex-col justify-center items-center gap-4 sm:gap-6 opacity-100">
        <h1 className="text-2xl sm:text-4xl font-bold leading-tight">
          Professional Headshots done with AI<br className="hidden sm:inline" /> at your home.
        </h1>
        <p className="text-base sm:text-xl text-gray-600 leading-relaxed">
          Transform your photos into high-quality, professional<br className="hidden sm:inline" /> headshots effortlessly.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:flex sm:justify-center gap-4 sm:space-x-8 w-full max-w-[967px]">
        <FeatureItem Icon={mdi} text="Pick from 150+ styles" />
        <FeatureItem Icon={circul} text="Done in less than 1 hour" />
        <FeatureItem Icon={lock} text="Strict data protection" />
        <FeatureItem Icon={tick} text="Guaranteed results" />
      </div>
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 w-full">
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition text-sm sm:text-base">
          Get Started For Free →
        </button>
        <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition text-sm sm:text-base">
          Watch Video Demo
        </button>
      </div>
      
      <div ref={carouselRef} className="flex overflow-x-hidden w-full px-2 sm:px-4 pt-1 pb-0">
        {[...headshots, ...headshots].map((url, index) => (
          <HeadshotCard key={index} imageUrl={url} />
        ))}
      </div>
    </div>
  );
}