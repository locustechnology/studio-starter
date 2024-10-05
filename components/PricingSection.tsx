'use client'
import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

const PricingComponent = () => {
  const [expandedTier, setExpandedTier] = useState<string | null>('STANDARD');

  const pricingTiers = [
    {
      name: 'Starter',
      price: '$9',
      features: [
        '📸 20 high-quality headshots',
        '⏱ 2-hour processing time',
        '👚 5 outfits and backgrounds',
        '🧘 5 poses',
      ],
      buttonText: 'Try Now',
    },
    {
      name: 'Professional',
      price: '$19',
      features: [
        '📸 31 high-quality headshots',
        '⏱ 2-hour processing time',
        '👚 30+ styles',
        '🧘 10+ poses',
      ],
      highlight: true,
      popularTag: '82% pick this plan',
      buttonText: 'Buy Now',
    },
    {
      name: 'Business',
      price: '$29',
      features: [
        '📸 100 high-quality headshots',
        '⏱ 30-min processing time',
        '👚 40 outfits and backgrounds',
        '🧘 40 poses',
      ],
      bestValueTag: 'Best Value',
      buttonText: 'Buy Now',
    },
  ];

  const toggleTier = (tierName: string) => {
    setExpandedTier(expandedTier === tierName ? null : tierName);
  };

  const handlePayment = () => {
    window.open('https://www.paypal.com/ncp/payment/NEHN97VWMDYPE', '_blank');
  };

  return (
    <div className="w-full min-h-screen bg-[#FBFBFB] py-8 px-4 md:px-6 lg:px-8 font-['Poppins'] rounded-[60px]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 font-['Plus Jakarta Sans']">
          Premium quality without premium pricing.
        </h1>
        <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
          Save hundreds compared to a photo shoot. Customize your AI professional headshot with 
          manual edits or get a redo if the initial uploads were wrong.
        </p>
        
        <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-6 lg:space-y-0">
          {pricingTiers.map((tier) => (
            <div key={tier.name} className="flex-1 relative">
              {(tier.popularTag || tier.bestValueTag) && (
                <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-100 text-purple-600 px-4 py-1 text-sm rounded-full border border-purple-600 whitespace-nowrap">
                  {tier.popularTag || tier.bestValueTag}
                </div>
              )}
              <div className={`bg-white rounded-2xl p-6 h-full ${
                tier.highlight ? 'lg:shadow-xl lg:-mt-4 lg:mb-4' : ''
              }`}>
                <div className="flex justify-between items-center cursor-pointer lg:cursor-default" onClick={() => toggleTier(tier.name)}>
                  <h2 className={`text-xl font-semibold ${tier.highlight ? 'text-purple-600' : 'text-blue-600'}`}>
                    {tier.name}
                  </h2>
                  <div className="lg:hidden">
                    {expandedTier === tier.name ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </div>
                </div>
                <p className="text-3xl font-bold mt-2">
                  {tier.price}<span className="text-lg font-normal text-gray-500">/ month</span>
                </p>
                <p className="text-sm text-gray-500 mb-4">billed monthly</p>
                
                <div className={`${expandedTier === tier.name ? 'block' : 'hidden'} lg:block`}>
                  <ul className="mb-6 space-y-2">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2 flex-shrink-0">{feature.split(' ')[0]}</span>
                        <span>{feature.split(' ').slice(1).join(' ')}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={handlePayment}
                    className={`w-full py-3 rounded-full transition flex items-center justify-center ${
                      tier.highlight ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    <span className="font-medium">{tier.buttonText}</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                  <p className="mt-4 text-sm text-center text-gray-500">Secure payment via PayPal</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingComponent;