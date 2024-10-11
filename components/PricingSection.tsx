'use client'
import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const PricingComponent = () => {
  const router = useRouter();
  const pricingTiers = [
    {
      name: 'BASIC',
      price: '$10',
      originalPrice: '$29',
      features: [
        '📸 20 high-quality headshots',
        '⏱ 2-hour processing time',
        '👚 5 outfits and backgrounds',
        '🧘 5 poses',
      ],
      buttonText: 'Try Now',
    },
    {
      name: 'STANDARD',
      price: '$19',
      originalPrice: '$45',
      features: [
        '📸 60 high-quality headshots',
        '⏱ 1-hour processing time',
        '👚 20 outfits and backgrounds',
        '🧘 20 poses',
      ],
      buttonText: 'Try Now',
      highlight: true,
      popularTag: '82% pick this plan',
    },
    {
      name: 'PREMIUM',
      price: '$29',
      originalPrice: '$75',
      features: [
        '📸 100 high-quality headshots',
        '⏱ 30-min processing time',
        '👚 40 outfits and backgrounds',
        '🧘 40 poses',
      ],
      buttonText: 'Try Now',
      bestValueTag: 'Best Value',
    },
  ];

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await fetch('/api/user');
        const user = await response.json();
        if (!user) {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error checking user:', error);
        // Handle the error appropriately
      }
    };
    checkUser();
  }, [router]);

  const handlePayment = () => {
    window.open('https://www.paypal.com/ncp/payment/NEHN97VWMDYPE', '_blank');
  };

  return (
    <div className="w-full bg-gray-50">
      <div className="max-w-[1274px] mx-auto bg-white rounded-[60px] py-20 px-8">
        <div className="flex flex-col gap-[10px]">
          <h2 className="text-center text-gray-500 font-semibold font-jakarta">PRICING</h2>
          <h1 className="text-center text-4xl sm:text-5xl lg:text-5xl font-bold font-jakarta">Premium Quality at 10 times less price</h1>
          <p className="text-center text-gray-600 max-w-3xl mx-auto font-poppins">
            No studio visits. No $200+ photoshoot fees. No waiting for appointments. Achieve stunning, 
            professional-grade headshots in just 30 minutes—all from the comfort of your home.
          </p>
          
          <div className="flex flex-col lg:flex-row lg:justify-center space-y-8 lg:space-y-0 lg:space-x-8 mt-12">
            {pricingTiers.map((tier, index) => (
              <div key={tier.name} className="flex-1 max-w-[362px] mx-auto lg:mx-0 relative pt-6"> {/* Added pt-6 for padding top */}
                {(tier.popularTag || tier.bestValueTag) && (
                  <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-full text-center ${tier.popularTag ? 'text-sm' : ''}`}>
                    <span className={`inline-block px-4 py-1 rounded-full text-sm font-poppins ${
                      tier.highlight ? 'bg-gradient-to-r from-purple-400 to-blue-500 text-white border-2 border-image-source: linear-gradient(90deg, #8371FF -39.48%, #A077FE 32.07%, #01C7E4 100%);' : 'bg-purple-100 text-purple-600'
                    }`}>
                      {tier.popularTag || tier.bestValueTag}
                    </span>
                  </div>
                )}
                <div className={`bg-white rounded-3xl p-8 h-full flex flex-col ${
                  tier.highlight ? 'shadow-2xl' : 'border border-gray-200'
                }`}>
                  <h2 className={`text-xl font-semibold mb-4 ${
                    tier.highlight ? 'text-purple-600' : 'text-blue-600'
                  } font-jakarta`}>
                    {tier.name}
                  </h2>
                  <div className="mb-2">
                    <span className="text-4xl font-bold font-jakarta">{tier.price}</span>
                    <span className="text-lg text-gray-400 line-through ml-2 font-poppins">{tier.originalPrice}</span>
                  </div>
                  <p className="text-gray-600 mb-6 font-poppins">One Time Payment</p>
                  <ul className="mb-8 space-y-4 flex-grow">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start font-poppins">
                        <span className="mr-2 text-xl">{feature.split(' ')[0]}</span>
                        <span>{feature.split(' ').slice(1).join(' ')}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={handlePayment}
                    className={`w-full h-[48px] rounded-[50px] border-2 px-[25px] py-[12px] transition flex items-center justify-center gap-[10px] font-poppins ${
                      tier.highlight ? 'bg-[#5B16FE] text-white hover:bg-[#5B16FE]' : 'bg-white text-purple-600 hover:bg-purple-50'
                    } border-[#5B16FE]`}
                  >
                    <span className="font-medium">{tier.buttonText}</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                  <p className="mt-4 text-sm text-center text-gray-500 font-poppins">No subscription required</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingComponent;