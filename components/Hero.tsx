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
  <div className="w-[162px] h-[246px] rounded-[18.69px] overflow-hidden flex-shrink-0 relative">
    <Image src={imageUrl} alt="AI Headshot" layout="fill" objectFit="cover" />
  </div>
);

interface FeatureItemProps {
  Icon: string;
  text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ Icon, text }) => (
  <div className="flex items-center space-x-2">
    <Image src={Icon} alt="Feature icon" width={20} height={20} />
    <span className="text-xs sm:text-sm text-gray-600 font-['Poppins']">{text}</span>
  </div>
);

export default function AIHeadshotsLandingPage() {
  const headshots = [
    "/Carosal/image1.svg",
    "/Carosal/image2.svg",
    "/Carosal/image3.svg",
    "/Carosal/image4.svg",
    "/Carosal/image5.svg",
    "/Carosal/image6.svg",
    "/Carosal/image7.svg",
    "/Carosal/image8.svg",
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
        carousel.scrollLeft = 0;
      } else {
        carousel.scrollLeft = scrollPosition;
      }
      requestAnimationFrame(scroll);
    };

    const animation = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animation);
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-between py-4 sm:py-8 gap-6 sm:gap-12 px-4 sm:px-8">
      <div className="text-center w-full max-w-[982px] flex flex-col justify-center items-center gap-4 sm:gap-6 opacity-100">
        <h1 className="text-2xl sm:text-4xl font-bold leading-tight font-['Plus Jakarta Sans']">
          Professional Headshots done with AI<br className="hidden sm:inline" /> at your home.
        </h1>
        <p className="text-base sm:text-xl text-gray-600 leading-relaxed font-['Poppins']">
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
        <button className="bg-[#5B16FE] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#4A12CC] transition text-sm sm:text-base font-['Poppins']">
          Get Started For Free →
        </button>
        <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition text-sm sm:text-base font-['Poppins']">
          Watch Video Demo
        </button>
      </div>
      
      <div className="relative w-full h-[247px] overflow-hidden">
        <div 
          ref={carouselRef} 
          className="flex overflow-x-hidden w-full h-full px-0 sm:px-[46px] py-[1px] gap-[10px] sm:gap-[20px]"
        >
          {[...headshots, ...headshots].map((url, index) => (
            <HeadshotCard key={index} imageUrl={url} />
          ))}
        </div>
        <div className="absolute top-0 left-0 w-[200px] sm:w-[405.5px] h-full bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[200px] sm:w-[405.5px] h-full bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}