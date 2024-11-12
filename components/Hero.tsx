'use client'
import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import lock from "@/public/logo/lock.svg"
import circul from "@/public/logo/circul.svg"
import mdi from "@/public/logo/mdi.svg"
import tick from "@/public/logo/tick.svg"
import AI  from "@/public/logo/AI.svg"
import { Sparkles } from 'lucide-react'; // Import the Sparkles icon or use an appropriate icon from your icon set
import Overlay  from "@/public/Overlay.svg"
import Link from 'next/link';

interface HeadshotCardProps {
  imageUrl: string;
}

const HeadshotCard: React.FC<HeadshotCardProps> = ({ imageUrl }) => (
  <div className="w-[120px] h-[180px] sm:w-[162px] sm:h-[246px] rounded-[12px] sm:rounded-[18.69px] overflow-hidden flex-shrink-0 relative">
    <Image src={imageUrl} alt="AI Product Photo" layout="fill" objectFit="cover" />
    <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
      <Image src={AI} alt="AI Logo" width={60} height={16} className="w-[60px] h-[16px] sm:w-[90px] sm:h-[25px]" />
    </div>
  </div>
);

interface FeatureItemProps {
  Icon: string;
  text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ Icon, text }) => (
  <div className="flex items-center space-x-2">
    <Image src={Icon} alt="Feature icon" width={20} height={20} className="w-5 h-5 sm:w-6 sm:h-6" />
    <span className="text-xs sm:text-sm text-gray-700 font-poppins">{text}</span>
  </div>
);

export default function Hero() {
  const headshots = [
    "/product-carousel/image1.png",
    "/product-carousel/image2.png",
    "/product-carousel/image3.png",
    "/product-carousel/image4.png",
    "/product-carousel/image5.png",
    "/product-carousel/image6.png",
    "/product-carousel/image7.png",
    // "/product-carousel/image8.png",
  ];

  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scrollWidth = carousel.scrollWidth;
    const clientWidth = carousel.clientWidth;
    let scrollPosition = 0;

    const scroll = () => {
      scrollPosition += 3; // Adjust this value to control scroll speed
      if (scrollPosition >= scrollWidth / 2) {
        scrollPosition = 0;
        carousel.scrollLeft = 0;
      } else {
        carousel.scrollLeft = scrollPosition;
      }
    };

    const intervalId = setInterval(scroll, 30); // Adjust interval for smoother scrolling

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] flex flex-col items-center justify-between bg-gray-100 px-4 py-8 sm:px-6 lg:px-8 font-poppins">
      {/* <div className="flex items-center w-full max-w-[408px] h-[44px] rounded-[148px] bg-[#ECF9FF] relative overflow-hidden font-poppins">
        <div className="absolute inset-0 rounded-[148px]" style={{
          border: '1px solid transparent',
          backgroundImage: 'linear-gradient(90deg, #8371FF -39.48%, #A077FE 32.07%, #01C7E4 100%)',
          backgroundOrigin: 'border-box',
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'destination-out',
          maskComposite: 'exclude',
        }}></div>
        <div className="flex items-center space-x-[10px] px-2 py-2 w-full h-full">
          <Image src={Overlay} alt="Sparkle icon" width={28} height={28} className="flex-shrink-0" />
          <p className="text-sm whitespace-nowrap font-medium" style={{
            background: 'linear-gradient(90deg, #8371FF -39.48%, #A077FE 32.07%, #01C7E4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            We just upgraded our Headshot Quality with{' '}
            <span className="font-bold text-[#01C7E4]" style={{
              WebkitTextFillColor: '#01C7E4',
            }}>
              Flux Model!
            </span>
          </p>
        </div>
      </div> */}
      
      <div className="text-center w-full max-w-[982px] flex flex-col justify-center items-center gap-4 sm:gap-6 mt-6 sm:mt-8">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight font-jakarta px-4 whitespace-nowrap">
          AI Studio for {' '}
          <span style={{
            background: 'linear-gradient(90deg, #4C6FFF 0%, #62CDFF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Product Photos 
          </span>
        </h1>
        <p className="text-sm sm:text-base lg:text-xl text-gray-600 leading-relaxed max-w-[800px] px-4">
         Create stunning product images with our AI-powered platform. 
         Save time, reduce costs, and stand out with custom, high-quality visuals.
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 sm:gap-8 w-full max-w-[967px] mt-6 sm:mt-8 px-4">
        <FeatureItem Icon={mdi} text="150+ styles and outfits" />
        <FeatureItem Icon={circul} text="Results within 1 hour" />
        <FeatureItem Icon={lock} text="Strict Data Protection" />
        <FeatureItem Icon={tick} text="Moneyback Guarantee" />
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 w-full mt-6 sm:mt-8 px-4">
      <Link href="/login">
        <button className="w-full sm:w-[269px] h-[48px] rounded-[50px] bg-[#5B16FE] text-white font-semibold hover:bg-[linear-gradient(0deg,#5B16FE,#5B16FE),linear-gradient(0deg,rgba(0,0,0,0.1),rgba(0,0,0,0.1))] transition-colors duration-300 px-6 sm:px-[25px] py-3 sm:py-[12px] flex items-center justify-center gap-2 sm:gap-[10px] text-sm sm:text-base">
          Get Started
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        </Link>
        {/* <button className="w-full sm:w-[269px] h-[48px] rounded-[50px] bg-white text-indigo-600 font-semibold border border-indigo-600 hover:bg-indigo-50 transition-colors duration-300 px-6 sm:px-[25px] py-3 sm:py-[12px] flex items-center justify-center gap-2 sm:gap-[10px] text-sm sm:text-base">
          Watch Video Demo
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        </button> */}
      </div>
      
      <div className="relative w-screen overflow-hidden mt-8 sm:mt-12">
        <div 
          ref={carouselRef} 
          className="flex w-full h-[180px] sm:h-[246px] gap-[12px] sm:gap-[24px] overflow-x-hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {[...headshots, ...headshots].map((url, index) => (
            <HeadshotCard key={index} imageUrl={url} />
          ))}
        </div>
        <div className="absolute top-0 left-0 w-[50px] sm:w-[100px] h-full bg-gradient-to-r from-blue-50 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[50px] sm:w-[100px] h-full bg-gradient-to-l from-blue-50 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}
