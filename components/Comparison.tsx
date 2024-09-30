import React from 'react';

const ComparisonPage = () => {
  const comparisonData = [
    { icon: '💰', label: 'Value for money', goStudio: '$49', studioPhotoshoot: '$200' },
    { icon: '⏱️', label: 'Save time', goStudio: '60 minutes', studioPhotoshoot: '2-3 days' },
    { icon: '💎', label: 'Variety', goStudio: '40 headshots', studioPhotoshoot: '4-5 headshots' },
    { icon: '👤', label: 'More choices', goStudio: '20 styles', studioPhotoshoot: '1 style' },
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl mx-auto bg-white rounded-3xl">
      <h1 className="text-sm md:text-xl font-semibold text-center mb-2 text-gray-500">COMPARE</h1>
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-2 md:mb-4 text-gray-900">Get hassle free professional headshots from anywhere</h2>
      <p className="text-sm md:text-lg text-center text-gray-600 mb-6 md:mb-12">People choose us because we serve the best for everyone at best price.</p>
      
      <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
        <div></div>
        <div className="text-center font-semibold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">Go Studio.ai</div>
        <div className="text-center font-semibold text-gray-600">Studio Photoshoot</div>
      </div>

      {comparisonData.map((item, index) => (
        <div key={index} className="grid grid-cols-3 gap-2 mb-4 items-center">
          <div className="flex items-center">
            <span className="mr-2 text-xl md:text-2xl">{item.icon}</span>
            <span className="text-xs md:text-base text-gray-600">{item.label}</span>
          </div>
          <div className="text-center font-bold text-sm md:text-base">{item.goStudio}</div>
          <div className="text-center text-gray-500 text-sm md:text-base">{item.studioPhotoshoot}</div>
        </div>
      ))}
      
      <div className="text-center mt-6 md:mt-12">
        <button className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full text-sm md:text-base w-full md:w-auto md:px-12">
          Get Started →
        </button>
      </div>
    </div>
  );
};

export default ComparisonPage;