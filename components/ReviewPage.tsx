'use client'
import React, { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Logo from "/public/98.png";
import old from "@/public/testimonial/old.svg"
import oldmen from "@/public/testimonial/oldmen.svg"
import wome from "@/public/testimonial/wome.svg"
import girl from "@/public/testimonial/girl.svg"
import boy from "@/public/testimonial/boy.svg"
import young from "@/public/testimonial/young.svg"

import Ber from "@/public/logo/Ber.svg";
import Box from "@/public/logo/Box.svg";
import Dell from "@/public/logo/Dell.svg";
import ebay from "@/public/logo/ebay.svg";
import Ncr from "@/public/logo/Ncr.svg";
import Over from "@/public/logo/Over.svg";
import Roger from "@/public/logo/Roger.svg";
import Shp from "@/public/logo/Shp.svg";

const reviews = [
  { name: "Caleb Wright", comment: "These AI headshots are next level.", rating: 5, image: old},
  { name: "Luke Anderson", comment: "Blown away. The future of photography is here.", rating: 5, image: oldmen },
  { name: "Andrew Robins", comment: "Effective, fast, and easy. Great service!", rating: 5, image: wome },
  { name: "Owen Harris", comment: "Professional photos in minutes. Amazing!", rating: 5, image: girl},
  { name: "Cherry Cho", comment: "GoStudio.ai is now my go-to for professional photos.", rating: 5, image: boy },
  { name: "Amalia Müller", comment: "Very satisfied with the quick service and quality.", rating: 5, image: young },
  { name: "Hannah Lee", comment: "Quick, easy, and surprisingly professional.", rating: 5, image: old },
  { name: "Mia Yang", comment: "Go studio.ai is now my go-to site for professional photo.", rating: 5, image: wome },
  { name: "Jenny Brown", comment: "Very affordable and amazed by the results.", rating: 5, image: girl },
  { name: "Chris", comment: "Quick service and variety of headshots at this price.", rating: 5, image: oldmen },
  { name: "Camille", comment: "It just Amazin'", rating: 5, image: young },
  { name: "Kevin", comment: "Saved my time and money. My new headshot looks fantastic!", rating: 5, image: old },
  { name: "Sarah", comment: "It transformed my selfie into a polished, professional headshot in minutes.", rating: 5, image: wome },
  { name: "Janet", comment: "A perfect solution for a last-minute headshot. Top notch quality.", rating: 5, image: girl },
  { name: "Alex", comment: "Impressed by how professional my headshot turned out", rating: 5, image: boy },
];

const brands = [
  { src: Ber, alt: "Ber", hoverColor: "light-blue" },
  { src: Box, alt: "Box", hoverColor: "blue" },
  { src: Dell, alt: "Dell", hoverColor: "blue" },
  { src: ebay, alt: "eBay", hoverColor: "multi" },
  { src: Ncr, alt: "NCR", hoverColor: "black" },
  { src: Over, alt: "Over", hoverColor: "black" },
  { src: Roger, alt: "Roger", hoverColor: "red" },
  { src: Shp, alt: "SHP", hoverColor: "green" },
];

const ReviewPage = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      const scrollWidth = carousel.scrollWidth;
      const viewportWidth = carousel.offsetWidth;

      const animateScroll = () => {
        if (carousel.scrollLeft >= scrollWidth - viewportWidth) {
          carousel.scrollLeft = 0;
        } else {
          carousel.scrollLeft += 1;
        }
      };

      const intervalId = setInterval(animateScroll, 30);

      return () => clearInterval(intervalId);
    }
  }, []);

  return (
    <div className="w-full max-w-[1276px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-[30px] sm:gap-[60px]">
      {/* Brands carousel */}
      <div className="w-full overflow-hidden">
        <div ref={carouselRef} className="flex items-center space-x-8 py-[31px] whitespace-nowrap overflow-hidden">
          {[...brands, ...brands].map((brand, idx) => (
            <div key={idx} className="w-[100px] flex-shrink-0">
              <Image 
                src={brand.src} 
                alt={brand.alt} 
                width={100} 
                height={100} 
                className={`transition-all duration-300 ${
                  brand.hoverColor === 'multi' 
                    ? 'hover:filter hover:hue-rotate-90' 
                    : `hover:${brand.hoverColor === 'light-blue' ? 'text-sky-300' : `text-${brand.hoverColor}-500`}`
                }`}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Stats */}
      <div className="flex justify-center">
        <div className="flex flex-row justify-between w-full max-w-xs sm:max-w-3xl">
          <div className="text-center">
            <h2 className="text-4xl sm:text-6xl font-bold text-blue-500 mb-2 font-['Plus Jakarta Sans']">86000</h2>
            <p className="text-xs sm:text-lg font-semibold font-['Poppins']">AI Headshots created</p>
          </div>
          <div className="text-center">
            <h2 className="text-4xl sm:text-6xl font-bold text-blue-500 mb-2 font-['Plus Jakarta Sans']">2100</h2>
            <p className="text-xs sm:text-lg font-semibold font-['Poppins']">Happy Customers Globally</p>
          </div>
        </div>
      </div>
      
      {/* Reviews */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* AI Summary */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-3 text-white flex flex-col justify-between aspect-[4/3]">
          <div>
            <h3 className="text-base sm:text-xl font-semibold mb-1 sm:mb-2 font-['Plus Jakarta Sans']">AI Summary</h3>
            <p className="text-[10px] sm:text-xs mb-1 sm:mb-2 font-['Poppins'] line-clamp-3 sm:line-clamp-none">Customers praise the product's convenience, price and ease of use, especially for selecting styles and AI Feedback on uploading images.</p>
          </div>
          <div>
            <div className="flex items-center gap-1 mb-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-current text-yellow-400" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-semibold font-['Poppins']">112</span>
            </div>
            <p className="text-[10px] sm:text-xs font-['Poppins']">based on 112 written reviews</p>
          </div>
        </div>
        
        {/* Review cards */}
        {reviews.map((review, index) => (
          <div key={index} className="relative rounded-lg overflow-hidden aspect-[4/3]">
            <Image 
              src={review.image} 
              alt={review.name} 
              layout="fill" 
              objectFit="cover" 
              className="w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            <div className="absolute top-2 left-2 bg-white/80 rounded-full px-2 py-1 flex items-center space-x-1">
              <Image src={Logo} alt="GoStudio.ai" width={12} height={12} className="w-3 h-3" />
              <span className="text-[8px] sm:text-[10px] font-semibold text-gray-800 font-['Poppins']">GoStudio.ai</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 text-white">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-xs sm:text-sm font-['Plus Jakarta Sans']">{review.name}</h3>
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-2 h-2 sm:w-3 sm:h-3 fill-current text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-[8px] sm:text-xs text-gray-200 line-clamp-2 font-['Poppins']">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewPage;