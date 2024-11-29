import React from 'react';
import Image from 'next/image';
import Union from '/public/Union.png'

const Banner = () => {
  return (
    <div className="w-full max-w-[1276px] mx-auto rounded-[13.64px] sm:rounded-[48px] overflow-hidden mb-4 sm:mb-8 font-poppins">
      <div className="w-full h-[149px] sm:h-[459px] relative" style={{background: 'linear-gradient(90deg, #8371FF -39.48%, #A077FE 15.54%, #01C7E4 100%)'}}>
        <div className="absolute inset-0 backdrop-blur-sm"></div>
        <div className="flex flex-row h-full relative z-10">
          {/* Logo - hidden on small screens */}
          <div className="hidden sm:block sm:w-2/5 relative overflow-hidden">
            <Image
              src={Union}
              alt="Go logo"
              layout="fill"
              objectFit="cover"
              className="object-center"
            />
          </div>
          {/* Content */}
          <div className="w-full sm:w-3/5 p-4 sm:p-12 flex flex-col justify-center">
            <div className="relative mb-2 sm:mb-6">
              {/* <span className="bg-white text-[#8371FF] text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full absolute -top-3 sm:-top-6 right-0 sm:right-12 whitespace-nowrap">on average</span> */}
            </div>
            <h1 className="text-lg sm:text-4xl font-bold text-white leading-tight mb-2 sm:mb-6 font-jakarta">
              Save 87% on your professional photos.
              <br className="hidden sm:inline" />
              Whenever, wherever you are.
            </h1>
            <p className="text-xs sm:text-xl text-white mb-3 sm:mb-8">
              Get studio-quality, 4K images in a variety of outfits & settings in less than an hour.
            </p>
            <button className="w-[140px] sm:w-[200px] md:w-[318px] h-[36px] sm:h-[40px] md:h-[48px] bg-[#5B16FE] text-white text-[10px] sm:text-sm md:text-lg font-semibold rounded-full sm:rounded-[50px] px-2 sm:px-4 md:px-[25px] py-1 sm:py-2 md:py-[12px] hover:bg-[#5B16FE] transition duration-300 flex items-center justify-center gap-1 sm:gap-2 md:gap-[10px]">
    <span className="whitespace-nowrap">Get your Headshot Now</span>
    <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
