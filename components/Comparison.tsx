import React from 'react';

const ComparisonPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl md:text-2xl font-semibold text-center mb-2 text-gray-600">COMPARE</h1>
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-navy-900">Get hassle free professional headshots from anywhere</h2>
      <p className="text-xl text-center text-gray-600 mb-12">People choose us because we serve the best for everyone at best price.</p>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div></div>
        <div className="text-center font-semibold bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] text-transparent bg-clip-text">Go Studio.ai</div>
        <div className="text-center font-semibold text-gray-600">Studio Photoshoot</div>
      </div>
      {[
        { icon: '💰', label: 'Value for money', goStudio: '$49', studioPhotoshoot: '$200' },
        { icon: '⏱️', label: 'Save time', goStudio: '60 minutes', studioPhotoshoot: '2-3 days' },
        { icon: '📚', label: 'Variety', goStudio: '40 headshots', studioPhotoshoot: '4-5 headshots' },
        { icon: '👤', label: 'More choices', goStudio: '20 styles', studioPhotoshoot: '1 style' },
      ].map((item, index) => (
        <div key={index} className="grid grid-cols-3 gap-4 mb-6 items-center">
          <div className="flex items-center">
            <span className="mr-3 text-2xl">{item.icon}</span>
            <span className="text-gray-600 font-medium">{item.label}</span>
          </div>
          <div className="text-center font-bold text-navy-900">{item.goStudio}</div>
          <div className="text-center text-gray-500">{item.studioPhotoshoot}</div>
        </div>
      ))}
      
      <div className="text-center mt-12">
        <button className="bg-[#5B16FE] text-white font-bold py-3 px-20 rounded-full hover:bg-[#4A12D9] transition duration-300 text-lg">
          Get Started →
        </button>
      </div>
    </div>
  );
};

export default ComparisonPage;