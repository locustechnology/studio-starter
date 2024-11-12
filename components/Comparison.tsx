import React from 'react';
import { DollarSign, Clock, Layers, User } from 'lucide-react';
import Link from 'next/link';

const ComparisonPage = () => {
  const comparisonData = [
    { 
      label: 'Value for money', 
      icon: DollarSign, 
      goStudio: '$10', 
      studio: '$500+', 
      color: 'bg-green-500' 
    },
    { 
      label: 'Save time', 
      icon: Clock, 
      goStudio: '30 minutes', 
      studio: '1-2 days', 
      color: 'bg-gray-500' 
    },
    { 
      label: 'Variety', 
      icon: Layers, 
      goStudio: '20 product shots', 
      studio: '5-8 shots', 
      color: 'bg-red-400' 
    },
    { 
      label: 'More choices', 
      icon: User, 
      goStudio: '50+ Packs to choose from', 
      studio: '2-3 setups', 
      color: 'bg-purple-500' 
    },
  ];

  return (
    <div className="w-full max-w-[1276px] mx-auto bg-white rounded-[24px] sm:rounded-[60px] py-8 sm:py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-poppins">
      <div className="w-full sm:w-[992px] flex flex-col gap-4 sm:gap-6 max-w-full sm:max-w-none py-[18px] sm:py-0">
      <h2 className="text-center text-gray-500 font-semibold font-jakarta">COMPARE</h2>
        <h1 className="text-2xl sm:text-4xl font-bold text-center font-jakarta mb-2 sm:mb-2">
          Save Money and Time
        </h1>
        <p className="text-center text-gray-600 text-sm sm:text-lg mb-4 sm:mb-8 font-poppins">
          Choose the smarter way — save time and money without compromising on quality
        </p>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6 text-sm sm:text-base font-poppins">
          <div></div>
          <div className="font-semibold" style={{ background: 'linear-gradient(90deg, #8371FF -39.48%, #A077FE 32.07%, #01C7E4 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Go Studio.ai</div>
          <div className="font-semibold">Studio Photoshoot</div>
        </div>

        {comparisonData.map((item, index) => (
          <div key={index} className="space-y-2 sm:space-y-2 pb-3 sm:pb-4 border-b border-[rgba(10,23,39,0.1)]">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 items-center text-sm sm:text-base font-poppins">
              <div className="flex items-center">
                <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full ${item.color} flex items-center justify-center mr-2 sm:mr-3`}>
                  <item.icon className="text-white" size={12} />
                </div>
                <span className="font-poppins">{item.label}</span>
              </div>
              <div className="font-poppins">{item.goStudio}</div>
              <div className="text-gray-400 font-poppins">{item.studio}</div>
            </div>
          </div>
        ))}

        <div className="flex justify-center mt-6 sm:mt-8">
          <Link href="/login">
          <button className="w-full sm:w-[287px] h-[48px] rounded-[50px] bg-[#5B16FE] text-white font-semibold text-base flex items-center justify-center px-4 sm:px-[25px] py-3 sm:py-[12px] hover:opacity-90 transition-opacity font-poppins">
            <span>Get Started</span>
            <svg className="ml-2 sm:ml-[10px]" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;
