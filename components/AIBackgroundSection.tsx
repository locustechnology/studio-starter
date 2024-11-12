import React from 'react';
import Image from 'next/image';
import { Upload } from 'lucide-react';
import Link from 'next/link';


const ArrowSVG = () => (
    <svg width="51" height="33" viewBox="0 0 51 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.1709 17.1302L23.0574 17.1798L22.1709 17.1302ZM50.9378 2.68185C50.9987 2.19502 50.6537 1.75108 50.1671 1.69028L42.238 0.699377C41.7514 0.638571 41.3076 0.983926 41.2466 1.47075C41.1857 1.95757 41.5308 2.40151 42.0173 2.46232L49.0654 3.34312L48.1828 10.3949C48.1218 10.8817 48.4669 11.3256 48.9535 11.3864C49.44 11.4472 49.8839 11.1019 49.9448 10.6151L50.9378 2.68185ZM0.811012 30.4726C10.8776 34.155 16.5345 33.0188 19.6315 29.4715C21.1322 27.7525 21.9265 25.5689 22.3781 23.406C22.8299 21.2422 22.9541 19.0163 23.0574 17.1798L21.2844 17.0806C21.1801 18.9356 21.0602 21.0303 20.6399 23.0433C20.2194 25.0571 19.5135 26.9063 18.2942 28.303C15.9511 30.9868 11.2883 32.4133 1.42128 28.804L0.811012 30.4726ZM23.0574 17.1798C23.3399 12.1599 24.4726 9.55973 25.9713 8.18496C27.4633 6.81629 29.5159 6.47602 32.1612 6.49764C33.4796 6.50842 34.8661 6.60565 36.3652 6.67884C37.8468 6.75117 39.4083 6.79775 40.9954 6.69572C44.1828 6.49079 47.5023 5.68457 50.6017 3.27289L49.5118 1.8706C46.7775 3.99817 43.8378 4.7327 40.8821 4.92273C39.3975 5.01818 37.9165 4.97579 36.4523 4.90431C35.0054 4.83367 33.5427 4.73223 32.1763 4.72106C29.452 4.6988 26.7925 5.02159 24.7714 6.87563C22.757 8.72357 21.5756 11.9057 21.2844 17.0806L23.0574 17.1798Z" fill="url(#paint0_linear_1410_33328)"/>
      <defs>
        <linearGradient id="paint0_linear_1410_33328" x1="52.1726" y1="19.2709" x2="41.3195" y2="-1.16645" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8371FF"/>
          <stop offset="0.394435" stopColor="#A077FE"/>
          <stop offset="1" stopColor="#01C7E4"/>
        </linearGradient>
      </defs>
    </svg>
  );
  

const AIBackgroundSection = () => {
  return (
    <div className="w-full max-w-[1276px] mx-auto bg-white text-black rounded-[24px] px-4 sm:px-6 lg:px-20 py-16 space-y-8 font-poppins">
      <div className="text-center space-y-4">
        <h2 className="text-gray-500 font-semibold font-jakarta">AI TOOL</h2>
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold font-jakarta">
          AI background & Scene Creation
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
          Generate scenes and background to create new assets from existing photos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Left side - Upload Box */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="space-y-2">
            {/* <h3 className="text-lg font-semibold text-gray-900 font-jakarta">AI TOOLS</h3> */}
            <h2 className="text-2xl font-bold text-gray-900 font-jakarta">Try GoStudio</h2>
            <p className="text-gray-600">AI powered creative tools to generate product photos easily.</p>
          </div>
          
          <div className="mt-8 border-2 border-dashed border-gray-200 rounded-xl p-8">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Link 
                href="/login" 
                className="bg-gradient-to-r from-[#8371FF] to-[#01C7E4] text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2"
              >
                Upload Image
                <Upload className="w-5 h-5" />
              </Link>
              <p className="text-sm text-gray-500">Sign in to start creating</p>
              <p className="text-xs text-gray-400">Your data is private and secure</p>
            </div>
          </div>
        </div>

        {/* Right side - Image Transformation Preview */}
        <div className="relative flex items-center justify-center min-h-[400px]">
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <Image 
              src="/samples/perfume-original.svg" 
              alt="Original product"
              width={180}
              height={180}
              className="rounded-2xl"
            />
          </div>


    {/* Arrow */}
    <div className="absolute left top-1/2 -translate-x-1/2 -translate-y-1/2">
            <ArrowSVG />
          </div>


          {/* <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
            <svg className="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M4 12h16m-7-7l7 7-7 7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div> */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 space-y-4">
            <Image 
              src="/samples/perfume-transformed-1.svg" 
              alt="Transformed product 1"
              width={200}
              height={200}
              className="rounded-2xl"
            />
            <Image 
              src="/samples/perfume-transformed-2.svg" 
              alt="Transformed product 2"
              width={250}
              height={250}
              className="rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIBackgroundSection; 