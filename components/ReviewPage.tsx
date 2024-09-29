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

// Change these imports to use Image component instead
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
  { name: "Caleb Wright", comment: "These AI headshots are next level.", rating: 5, image: oldmen},
  { name: "Luke Anderson", comment: "Blown away. The future of photography is here.", rating: 5, image: wome },
  { name: "Andrew Robins", comment: "Effective, fast, and easy. Great service!", rating: 5, image: girl },
  { name: "Owen Harris", comment: "Professional photos in minutes. Amazing!", rating: 5, image: boy},
  { name: "Cherry Cho", comment: "GoStudio.ai is now my go-to for professional photos.", rating: 5, image: young },
  { name: "Amalia Müller", comment: "Very satisfied with the quick service and quality.", rating: 5, image: old },
  { name: "Hannah Lee", comment: "Quick, easy, and surprisingly professional.", rating: 5, image: oldmen },
  { name: "Hannah Lee", comment: "Quick, easy, and surprisingly professional.", rating: 5, image: wome },
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

const ReviewPage: React.FC = () => {
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
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="w-[1274px] h-[116px] mt-[156px] mx-auto mb-12 bg-[#F3F6F9] overflow-hidden">
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
        <div className="flex justify-center mb-12">
          <div className="flex flex-col sm:flex-row justify-between w-full max-w-3xl">
            <div className="text-center mb-4 sm:mb-0">
              <h2 className="text-5xl sm:text-6xl font-bold text-blue-500 mb-2">86000</h2>
              <p className="text-lg sm:text-xl font-semibold">AI Headshots created</p>
            </div>
            <div className="text-center">
              <h2 className="text-5xl sm:text-6xl font-bold text-blue-500 mb-2">2100</h2>
              <p className="text-lg sm:text-xl font-semibold">Happy Customers Globally</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-4 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">AI Summary</h3>
              <p className="text-sm mb-3">Customers praise the product's convenience, price and ease of use, especially for selecting styles and AI Feedback on uploading images.</p>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-semibold">112</span>
              </div>
              <p className="text-xs mt-1">based on 112 written reviews</p>
            </div>
          </div>
          
          {reviews.map((review, index) => (
            <div key={index} className="bg-black rounded-lg overflow-hidden">
              <div className="relative">
                <Image src={review.image} alt={review.name} width={300} height={128} className="w-full h-32 object-cover" />
                <div className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-md px-2 py-1 flex items-center space-x-1">
                  <Image src={Logo} alt="GoStudio.ai" width={16} height={16} className="w-4 h-4" />
                  <span className="text-xs font-semibold text-gray-800">GoStudio.ai</span>
                </div>
              </div>
              <div className="p-3 text-white">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold text-sm">{review.name}</h3>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-300">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;