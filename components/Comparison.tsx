import React from 'react';
import { DollarSign, Clock, Layers, User } from 'lucide-react';

const ComparisonPage = () => {
  const comparisonData = [
    { 
      label: 'Value for money', 
      icon: DollarSign, 
      goStudio: '$19', 
      studio: '$200', 
      color: 'bg-green-500' 
    },
    { 
      label: 'Save time', 
      subLabel: 'Time to get photos',
      icon: Clock, 
      goStudio: '30 minutes', 
      studio: '2-3 days', 
      color: 'bg-gray-500' 
    },
    { 
      label: 'Variety', 
      subLabel: 'Number of photos',
      icon: Layers, 
      goStudio: '30 headshots', 
      studio: '4-5 headshots', 
      color: 'bg-red-400' 
    },
    { 
      label: 'More choices', 
      subLabel: 'Styling options',
      icon: User, 
      goStudio: '20 styles', 
      studio: '1 style', 
      color: 'bg-purple-500' 
    },
  ];

  return (
    <div className="w-full max-w-[1276px] mx-auto bg-white rounded-[24px] sm:rounded-[60px] py-10 sm:py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-poppins sm:min-h-[728.5px]">
      <div className="w-full sm:w-[992px] flex flex-col gap-4 sm:gap-6 max-w-[358px] sm:max-w-none py-[18px] sm:py-0">
        <h2 className="text-base sm:text-2xl font-bold text-center font-jakarta text-gray-600">COMPARE</h2>
        <h1 className="text-xl sm:text-4xl font-bold text-center font-jakarta mb-1 sm:mb-2">
          Save Money and Time
        </h1>
        <p className="text-center text-gray-600 text-xs sm:text-lg mb-3 sm:mb-8 font-poppins">
          Choose the smarter way — save time and money without compromising on quality
        </p>

        <div className="grid grid-cols-3 gap-1 sm:gap-4 mb-2 sm:mb-6 text-xs sm:text-base font-poppins">
          <div></div>
          <div className="font-semibold" style={{ background: 'linear-gradient(90deg, #8371FF -39.48%, #A077FE 32.07%, #01C7E4 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Go Studio.ai</div>
          <div className="font-semibold">Studio Photoshoot</div>
        </div>

        {comparisonData.map((item, index) => (
          <div key={index} className="space-y-1 sm:space-y-2 pb-2 sm:pb-4 border-b border-[rgba(10,23,39,0.1)]">
            <div className="grid grid-cols-3 gap-1 sm:gap-4 items-center text-xs sm:text-base font-poppins">
              <div className="flex items-center">
                <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full ${item.color} flex items-center justify-center mr-2 sm:mr-3`}>
                  <item.icon className="text-white" size={12} />
                </div>
                <span className="font-semibold">{item.label}</span>
              </div>
              <div className="font-bold">{item.goStudio}</div>
              <div className="text-gray-400">{item.studio}</div>
            </div>
            {item.subLabel && (
              <div className="grid grid-cols-3 gap-1 sm:gap-4 items-center text-[10px] sm:text-xs text-gray-500 font-poppins">
                <div className="pl-8 sm:pl-11">{item.subLabel}</div>
                <div></div>
                <div></div>
              </div>
            )}
          </div>
        ))}

        <div className="flex justify-center mt-3 sm:mt-8">
          <button className="w-full sm:w-[287px] h-[40px] sm:h-[48px] rounded-[50px] bg-[#7F56D9] text-white font-semibold text-sm sm:text-base flex items-center justify-center px-4 sm:px-[25px] py-2 sm:py-[12px] hover:opacity-90 transition-opacity font-poppins">
            <span>Get Started</span>
            <svg className="ml-2 sm:ml-[10px]" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;