'use client'
import React from 'react';
import { Star, Heart, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import Logo from "/public/logo/AI.svg";
import old from "@/public/testimonial/old.svg"
import oldmen from "@/public/testimonial/oldmen.svg"
import wome from "@/public/testimonial/wome.svg"
import girl from "@/public/testimonial/girl.svg"
import boy from "@/public/testimonial/boy.svg"
import young from "@/public/testimonial/young.svg"
import correct from "@/public/correct.svg"
import Luke from "@/public/Luke.svg"
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
  { name: "Luke Anderson", comment: "Blown away. The future of photography is here.", rating: 5, image: Luke },
  { name: "Andrew Robins", comment: "Effective, fast, and easy. Great service!", rating: 5, image: wome },
  { name: "Hannah Lee", comment: "Professional photos in minutes. Amazing!", rating: 5, image: girl},
  { name: "Owen Harris", comment: "GoStud.io is now my go-to for professional photos.", rating: 5, image: boy },
  { name: "Cherry ", comment: "Very satisfied with the quick service and quality.", rating: 5, image: young },
  { name: "Hannah Lee", comment: "Quick, easy, and surprisingly professional.", rating: 5, image: old },
  { name: "Mia Yang", comment: "Go studio.ai is now my go-to site for professional photo.", rating: 5, image: wome },
  { name: "Jenny Brown", comment: "Very affordable and amazed by the results.", rating: 5, image: girl },
  { name: "Chris", comment: "Quick service and variety of headshots at this price.", rating: 5, image: oldmen },
  { name: "Camille", comment: "It just Amazin'", rating: 5, image: young },
 
];

const brands = [
  { src: Ber, alt: "Ber", hoverColor: "#3B82F6" },
  { src: Box, alt: "Box", hoverColor: "#2563EB" },
  { src: Dell, alt: "Dell", hoverColor: "#2563EB" },
  { src: ebay, alt: "eBay", hoverColor: "#EF4444" },
  { src: Ncr, alt: "NCR", hoverColor: "#1F2937" },
  { src: Over, alt: "Over", hoverColor: "#1F2937" },
  { src: Roger, alt: "Roger", hoverColor: "#EF4444" },
  { src: Shp, alt: "SHP", hoverColor: "#10B981" },
];

const ReviewPage = () => {
  return (
    <div className="w-full max-w-[1440px] mx-auto font-poppins">
      {/* Logo Carousel */}
      <div className="w-full overflow-hidden mb-8">
        <div className="flex animate-scroll">
          {[...brands, ...brands].map((brand, idx) => (
            <div key={idx} className="w-[80px] sm:w-[100px] flex-shrink-0 mx-2 sm:mx-4">
              <Image 
                src={brand.src} 
                alt={brand.alt} 
                width={80}
                height={80}
                className="transition-all duration-300 grayscale hover:grayscale-0"
                style={{ filter: 'grayscale(100%)' }}
                onMouseEnter={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.style.filter = 'grayscale(0%)';
                  target.style.fill = brand.hoverColor;
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.style.filter = 'grayscale(100%)';
                  target.style.fill = '';
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="w-[358px] sm:w-full max-w-[1276px] mx-auto bg-white rounded-[24px] sm:rounded-[60px] py-[18px] sm:py-20 px-4 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-[5px] sm:gap-[60px]">
          <div>
          <h2 className="text-center text-gray-500 font-semibold font-jakarta">TESTIMONIALS</h2>
            
            {/* Stats */}
            <div className="flex justify-center space-x-8 sm:space-x-16 mb-4 sm:mb-6">
              <div className="text-center">
                <h2 className="text-3xl sm:text-5xl font-bold mb-1 font-jakarta" style={{ background: 'linear-gradient(90deg, #8371FF -39.48%, #A077FE 32.07%, #01C7E4 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>86000</h2>
                <p className="text-xs sm:text-base font-semibold text-gray-600">AI Headshots created</p>
              </div>
              <div className="text-center">
                <h2 className="text-3xl sm:text-5xl font-bold mb-1 font-jakarta" style={{ background: 'linear-gradient(90deg, #8371FF -39.48%, #A077FE 32.07%, #01C7E4 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>2100</h2>
                <p className="text-xs sm:text-base font-semibold text-gray-600">Happy Customers Globally</p>
              </div>
            </div>
            
            <p className="text-xs sm:text-base text-gray-600 text-center max-w-2xl mx-auto mb-4 sm:mb-8">
              Not made in a studio. Created by AI. Don't just take our word for it. Our AI turns everyday photos into professional headshots, that reflect your confidence & credibility.
            </p>
          </div>
          
          {/* Reviews */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[5px] sm:gap-6">
            {/* AI Summary */}
            <div className="bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] rounded-[11.2px] sm:rounded-[20px] p-3 sm:p-4 text-white w-full h-[111.4px] sm:h-[201px] flex flex-col justify-between col-span-1 sm:col-span-1">
              <div>
                <h3 className="text-base sm:text-2xl font-semibold mb-1 sm:mb-2 flex items-center font-jakarta">
                  <span className="mr-1 sm:mr-2">✨</span>
                  AI Summary
                </h3>
                <p className="text-[10px] sm:text-sm leading-tight line-clamp-3 sm:line-clamp-none">
                  Customers praise the product's realistic results, price, ease of use, loved the provided styles and poses and AI Feedback on uploading images.
                </p>
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="bg-white bg-opacity-20 rounded-full p-1">
                    <Heart size={16} className="text-white" />
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-full p-1">
                    <ThumbsUp size={16} className="text-white" />
                  </div>
                  <div className="bg-black bg-opacity-20 rounded-full px-2 py-0.5 text-xs font-semibold">
                    +112
                  </div>
                </div>
                <p className="text-xs">based on 112 written reviews</p>
              </div>
              <div className="sm:hidden flex items-center justify-between mt-1">
                <div className="flex items-center space-x-1">
                  <Heart size={12} className="text-white" />
                  <ThumbsUp size={12} className="text-white" />
                </div>
                <div className="text-[8px]">
                  +112 based on 112 written reviews
                </div>
              </div>
            </div>
            
            {/* Review cards */}
            {reviews.slice(0, 11).map((review, index) => (
              <div key={index} className="relative rounded-[11.2px] sm:rounded-[20px] overflow-hidden w-[156.75px] h-[111.4px] sm:w-full sm:h-[201px] mt-auto mr-auto">
                <Image 
                  src={review.image} 
                  alt={review.name} 
                  layout="fill" 
                  objectFit="cover" 
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <Image
                  src={correct}
                  alt="GoStud.io logo"
                  width={60}
                  height={24}
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 w-[60px] h-[24px] sm:w-[109px] sm:h-[32px]"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 text-white">
                  <h3 className="font-semibold text-xs sm:text-lg font-jakarta mb-0.5 sm:mb-1">{review.name}</h3>
                  <p className="text-[8px] sm:text-sm text-gray-200 mb-1 sm:mb-2 line-clamp-2">{review.comment}</p>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-2 h-2 sm:w-4 sm:h-4 fill-current text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
