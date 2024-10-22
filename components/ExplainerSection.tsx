import React from 'react';
import Image from 'next/image';
import step1 from "@/public/Step1.svg"
import blur from "@/public/blur.svg"
import AI from "@/public/AI.svg"

const ExplainerSection = () => {
  return (
    <div className="w-full max-w-[1276px] mx-auto bg-white text-black rounded-[24px] px-4 sm:px-6 lg:px-20 py-16 space-y-24 font-poppins">
      <h2 className="text-2xl sm:text-3xl font-normal font-jakarta text-center mb-16 mx-auto whitespace-nowrap px-4" style={{ opacity: '70%' }}>HOW IT WORKS</h2>      
      {/* Section 1: Upload Photos */}
      <section className="relative w-full max-w-[960px] mx-auto pt-8 space-y-8 text-center">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold">1</div>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold font-jakarta text-center">Upload a few photos</h3>
          <p className="text-lg sm:text-xl text-gray-600">Upload a few photos of yourself to let AI learn about you</p>
        </div>
        <div className="w-full">
          <Image 
            src={step1} 
            alt="Upload photos process" 
            width={960}
            height={476}
            layout="responsive"
            className="object-contain"
          />
        </div>
      </section>

      {/* Section 2: AI Processing */}
      <section className="relative w-full max-w-[960px] mx-auto pt-8 space-y-8 text-center">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold">2</div>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold font-jakarta text-center">AI trained personally for you</h3>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            AI creates a private, personalized model just for you—ensuring headshots that reflect your unique style and identity
          </p>
        </div>
        <div className="w-full">
          <Image 
            src={blur} 
            alt="AI processing" 
            width={960}
            height={516}
            layout="responsive"
            className="object-contain"
          />
        </div>
      </section>

      {/* Section 3: Download Headshots */}
      <section className="relative w-full max-w-[960px] mx-auto pt-8 space-y-8 text-center">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#8371FF] to-[#01C7E4] flex items-center justify-center text-white text-xl font-bold">3</div>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold font-jakarta text-center">Download favourite Headshots</h3>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            You'll receive a variety of backgrounds, poses, and styles, giving you
            the perfect AI-crafted Headshots to elevate your business
            professional profile
          </p>
        </div>
        <div className="w-full max-w-[862px] mx-auto">
          <Image 
            src={AI} 
            alt="Download headshots" 
            width={862}
            height={450}
            layout="responsive"
            className="object-contain rounded-3xl"
          />
        </div>
      </section>
    </div>
  );
};

export default ExplainerSection;
