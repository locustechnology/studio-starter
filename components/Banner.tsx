import React from 'react';
import Image from 'next/image';
import Union from '/public/Union.png'

const HeadshotContainer = () => {
  return (
    <div className="flex items-center justify-center w-full max-w-[1160px] mx-auto">
      <div className="w-full bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] rounded-[48px] shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row h-full relative">
          {/* Logo - hidden on small screens */}
          <div className="hidden lg:block lg:w-2/5 relative overflow-hidden lg:pl-0 lg:h-[459px]">
            <div className="absolute inset-0">
              <Image
                src={Union}
                alt="Go logo"
                layout="fill"
                objectFit="cover"
                className="object-right lg:object-right-top"
              />
            </div>
          </div>
          {/* Content */}
          <div className="w-full lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
            <div className="relative mb-4 lg:mb-6">
              <span className="bg-white text-[#8371FF] text-xs px-3 py-1 rounded-full absolute -top-6 right-0 lg:right-12 font-['Poppins']">on average</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-4 lg:mb-6 font-['Plus Jakarta Sans']">
              Save 87% on your professional photos.
              <br />
              Whenever, wherever you are.
            </h1>
            <p className="text-base lg:text-xl text-white mb-8 font-['Poppins']">
              Get studio-quality, 4K images in a variety of outfits
              & settings in less than an hour.
            </p>
            <button className="bg-indigo-700 text-white text-base lg:text-lg font-semibold py-3 px-6 rounded-full hover:bg-indigo-800 transition duration-300 self-start flex items-center font-['Poppins']">
              Get your Headshot Now
              <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadshotContainer;