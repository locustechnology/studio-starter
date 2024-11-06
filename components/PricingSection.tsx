'use client'
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { toast } from 'react-hot-toast';
import { useRouter, usePathname } from 'next/navigation';
import { User } from '@supabase/auth-helpers-nextjs';

const PayPalScriptProvider = dynamic(
  () => import('@paypal/react-paypal-js').then(mod => mod.PayPalScriptProvider),
  { ssr: false }
);
const PayPalButtons = dynamic(
  () => import('@paypal/react-paypal-js').then(mod => mod.PayPalButtons),
  { ssr: false }
);

interface PricingComponentProps {
  user: User | null;
}

const PricingComponent: React.FC<PricingComponentProps> = ({ user }) => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleGetStarted = () => {
    router.push('/overview');
  };

  const pricingTiers = [
    {
      name: 'STARTER',
      price: '10',
      originalPrice: '$29',
      features: [
        '🎯 20 Professional AI Headshots',
        '⚡ Delivery within 2 hours',
        '👔 5 Professional Styles',
        '✨ 5 Curated Poses',
      ],
      buttonText: 'Get Started',
    },
    {
      name: 'PROFESSIONAL',
      price: '19',
      originalPrice: '$45',
      features: [
        '🎯 60 Professional AI Headshots',
        '⚡ Priority Delivery (1 hour)',
        '👔 20 Business Attire Options',
        '✨ 20 Professional Poses',
      ],
      buttonText: 'Get Started',
      highlight: true,
      popularTag: 'Most Popular Choice',
    },
    {
      name: 'EXECUTIVE',
      price: '29',
      originalPrice: '$75',
      features: [
        '🎯 100 Professional AI Headshots',
        '⚡ Express Delivery (30 min)',
        '👔 40 Premium Style Options',
        '✨ 40 Executive Poses',
      ],
      buttonText: 'Get Started',
      bestValueTag: 'Premium Package',
    },
  ];

  const handlePayment = async (amount: string) => {
    try {
      console.log('Creating PayPal order for amount:', amount);
      const response = await fetch('/astria/paypal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency: 'USD',
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error || 'Unknown error'}`);
      }
      
      const order = await response.json();
      console.log('PayPal order created:', order);
      return order.id;
    } catch (error) {
      console.error('Error creating PayPal order:', error instanceof Error ? error : new Error(String(error)));
      toast.error(`Failed to create order: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  };

  const handlePaymentSuccess = async (data: { orderID: string }, selectedTier: any) => {
    try {
      console.log('Payment approved:', { orderID: data.orderID });
      
      const response = await fetch('/astria/paypal', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderID: data.orderID,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Payment captured:', result);

      // Retrieve the model data from localStorage
      const storedModelData = localStorage.getItem('trainModelData');
      let modelData = storedModelData ? JSON.parse(storedModelData) : { modelInfo: {}, imageUrls: [] };
      
      // Ensure we're not overwriting the existing modelInfo
      modelData.paymentInfo = {
        orderId: data.orderID,
        captureId: result.captureID,
        status: result.status,
        selectedTier: selectedTier,
      };
      
      // Make sure we're not losing the gender information
      if (!modelData.modelInfo) {
        modelData.modelInfo = {};
      }
      
      localStorage.setItem('trainModelData', JSON.stringify(modelData));
      console.log('Updated model data in localStorage:', modelData);

      toast.success('Payment successful! Redirecting to summary page.');
      router.push('/summary');
    } catch (error) {
      console.error('Error capturing payment:', error instanceof Error ? error : new Error(String(error)));
      toast.error(`Failed to process payment: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
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
              <div key={tier.name} className="flex-1 max-w-[362px] mx-auto lg:mx-0 relative pt-6">
                {(tier.popularTag || tier.bestValueTag) && (
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                    <div className="relative w-[184px] h-[42px]">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] rounded-full"></div>
                      <div className="absolute inset-[1.5px] bg-white rounded-full"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-sm font-semibold ${tier.bestValueTag ? 'text-[#5B16FE]' : 'bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] bg-clip-text text-transparent'}`}>
                          {tier.popularTag || tier.bestValueTag}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div className={`bg-white rounded-3xl p-8 h-full flex flex-col ${
                  tier.highlight ? 'shadow-2xl' : 'border border-gray-200'
                }`}>
                  <h2 className={`text-xl font-semibold mb-4 text-[#473BF0] font-jakarta`}>
                    {tier.name}
                  </h2>
                  <div className="mb-2">
                    <span className="text-4xl font-bold font-jakarta">${tier.price}</span>
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
                  {isHomePage ? (
                    <button
                      onClick={handleGetStarted}
                      className="w-full h-[48px] rounded-[50px] bg-[#5B16FE] text-white font-semibold text-base flex items-center justify-center px-4 py-3 hover:opacity-90 transition-opacity font-poppins"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  ) : (
                    isClient && (
                      <PayPalScriptProvider options={{ "clientId": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '', "currency": "USD" }}>
                        <PayPalButtons
                          createOrder={() => handlePayment(tier.price)}
                          onApprove={async (data, actions) => {
                            try {
                              await handlePaymentSuccess(data, tier);
                            } catch (error) {
                              console.error('Error in onApprove:', error instanceof Error ? error : new Error(String(error)));
                              toast.error(`Failed to process payment: ${error instanceof Error ? error.message : 'Unknown error'}`);
                            }
                          }}
                          onError={(err) => {
                            console.error('PayPal Checkout onError', err instanceof Error ? err : new Error(String(err)));
                            toast.error(`Payment error: ${err instanceof Error ? err.message : 'Unknown error'}`);
                          }}
                          style={{ layout: "vertical", shape: "rect" }}
                        />
                      </PayPalScriptProvider>
                    )
                  )}
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
