import React from 'react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import Borderone from "/public/Borderone.svg";
import Bordertwo from "/public/Bordertwo.svg";
import Borderthird from "/public/Borderthird.svg";
import Borderfour from "/public/Borderfour.svg";

interface SecurityFeatureProps {
  imageSrc: string | StaticImageData;
  title: string;
  description: string;
  lineCount: 2 | 3;
}

const SecurityFeature: React.FC<SecurityFeatureProps> = ({ imageSrc, title, description, lineCount }) => (
  <div className="flex items-start space-x-4 mb-6 sm:mb-0">
    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex-shrink-0 overflow-hidden bg-gradient-to-br from-purple-400 to-blue-400 mt-1">
      <Image src={imageSrc} alt={title} width={64} height={64} className="object-cover" />
    </div>
    <div className="flex-grow">
      <h3 className="text-white text-sm sm:text-lg font-semibold mb-1 font-jakarta">{title}</h3>
      <p className={`text-gray-400 text-xs sm:text-sm ${lineCount === 2 ? 'line-clamp-2' : 'line-clamp-3'}`}>{description}</p>
    </div>
  </div>
);

const DataSecuritySection: React.FC = () => {
  return (
    <div className="w-full max-w-[1276px] mx-auto bg-[#1E1E1E] rounded-3xl overflow-hidden relative p-6 sm:p-12 font-poppins">
      <div className="flex flex-col items-center">
        <h2 className="text-sm sm:text-base uppercase text-gray-400 mb-2 sm:mb-4 tracking-wider w-full text-center font-jakarta">PRIVACY</h2>
        <h1 className="text-2xl sm:text-5xl font-bold mb-3 sm:mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent text-center font-jakarta">
          We value Data Privacy
        </h1>
        <p className="text-gray-400 text-sm sm:text-lg mb-8 sm:mb-12 text-center max-w-2xl">
          Trusted by Fortune 500 Leaders and Top professionals.<br className="hidden sm:inline" />
          Reputed enterprise organisations and teams trust us with their data.
        </p>
        
        <div className="w-full grid sm:grid-cols-2 gap-y-6 sm:gap-x-16 sm:gap-y-12">
          <SecurityFeature
            imageSrc={Borderone}
            title="NO DATA SELLING, NO SHARING"
            description="We will never sell your data or share with the third party websites."
            lineCount={2}
          />
          <SecurityFeature
            imageSrc={Bordertwo}
            title="YOUR PHOTOS, YOUR CONTROL"
            description="We won't use your photos to train AI without your permissions."
            lineCount={2}
          />
          <SecurityFeature
            imageSrc={Borderthird}
            title="AUTO DELETION OF DATA"
            description="The system automatically deletes all your images after 90 days. You choose to keep the setting your way."
            lineCount={3}
          />
          <SecurityFeature
            imageSrc={Borderfour}
            title="TOP-NOTCH SECURITY"
            description="We encrypt all sensitive user data. We use industry's best trusted software for your data."
            lineCount={3}
          />
        </div>
        
        <button className="w-full sm:w-auto py-3 px-6 sm:px-8 bg-gradient-to-r from-[#8371FF] to-[#01C7E4] text-white font-semibold rounded-full hover:opacity-90 transition duration-300 flex items-center justify-center text-base sm:text-lg mt-8 sm:mt-12">
          Create Your Headshot
          <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DataSecuritySection;