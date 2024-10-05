import React from 'react';

const ComparisonPage = () => {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-4 rounded-[60px] font-['Poppins']">
      <div className="w-full max-w-md md:max-w-7xl bg-white p-8 md:p-20">
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-center mb-6 md:mb-8 font-['Plus Jakarta Sans']">COMPARE</h1>
        <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-center mb-6 md:mb-8 font-['Plus Jakarta Sans']">
          Get hassle free professional headshots from anywhere
        </h2>
        <p className="text-center text-gray-600 text-sm md:text-base mb-10 md:mb-12 font-['Poppins']">
          People choose us because we serve the best for everyone at best price.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-8 font-['Poppins']">
          <div></div>
          <div className="font-semibold text-purple-600 text-sm md:text-base">Go Studio.ai</div>
          <div className="font-semibold text-sm md:text-base">Studio Photoshoot</div>
        </div>

        {[
          { label: 'Value for money', icon: '💰', goStudio: '$49', studio: '$200' },
          { label: 'Save time', icon: '⏱️', goStudio: '60 minutes', studio: '2-3 days' },
          { label: 'Variety', icon: '📚', goStudio: '40 headshots', studio: '4-5 headshots' },
          { label: 'More choices', icon: '👤', goStudio: '20 styles', studio: '1 style' },
        ].map((item, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 mb-8 items-center text-sm md:text-base font-['Poppins']">
            <div className="flex items-center">
              <span className="mr-2 text-2xl">{item.icon}</span>
              <span className="hidden md:inline">{item.label}</span>
            </div>
            <div className="font-bold">{item.goStudio}</div>
            <div className="text-gray-500">{item.studio}</div>
          </div>
        ))}

        <div className="flex justify-center mt-10 md:mt-12">
          <button className="bg-[#5B16FE] text-white px-8 py-3 md:px-10 md:py-4 rounded-full font-semibold text-sm md:text-base hover:bg-[#4A12CC] transition-colors font-['Poppins'] w-[287px]">
            Get Started →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;