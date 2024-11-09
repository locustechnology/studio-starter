import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const sampleImages = [
  {
    src: '/samples/perfume.svg',
    alt: 'Perfume product photography'
  },
  {
    src: '/samples/food.svg',
    alt: 'Food photography'
  },
  {
    src: '/samples/furniture.svg',
    alt: 'Furniture photography'
  },
  {
    src: '/samples/flowers.svg',
    alt: 'Flower photography'
  },
  {
    src: '/samples/bottles.svg',
    alt: 'Product collection photography'
  }
];

const AIToolSection = () => {
  return (
    <div className="w-full max-w-[1276px] mx-auto bg-white text-black rounded-[24px] px-4 sm:px-6 lg:px-20 py-16 space-y-8 font-poppins">
      <div className="text-center space-y-4">
        <h2 className="text-gray-500 font-semibold font-jakarta">AI TOOL</h2>
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold font-jakarta">
          Select from 50+ templates or create you own and start creating your photos
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
          Generate scenes and background to create new assets from existing photos.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
        {sampleImages.map((image, index) => (
          <div 
            key={index} 
            className={`relative aspect-square rounded-xl overflow-hidden ${
              index === 4 ? 'border-2 border-blue-500' : ''
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Link href="/login">
          <button className="bg-[#5B16FE] text-white px-8 py-3 rounded-full font-semibold text-base flex items-center gap-2 hover:opacity-90 transition-opacity">
            Get Started
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AIToolSection;