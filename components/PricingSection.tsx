'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import Script from 'next/script';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';
import { ArrowRight } from 'lucide-react';

interface PriceData {
  price: {
    id: string;
    name: string | null;
    description: string | null;
  };
  product: {
    name: string;
    description: string;
  };
  formattedTotals: {
    total: string;
  };
}

interface PricingComponentProps {
  user: User | null;
}

declare global {
  interface Window {
    Paddle: any;
  }
}

const PricingComponent: React.FC<PricingComponentProps> = ({ user }) => {
  const router = useRouter();
  const [prices, setPrices] = useState<PriceData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [paddleLoaded, setPaddleLoaded] = useState(false);

  const supabase = createClientComponentClient<Database>();

  const initializePaddle = useCallback(async () => {
    console.log('Initializing Paddle');
    if (window.Paddle) {
      try {
        await window.Paddle.Environment.set('sandbox');
        
        await window.Paddle.Setup({
          token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || '',
          eventCallback: function(data: any) {
            console.log('Paddle event:', data);
            if (data.name === 'checkout.completed') {
              console.log('Checkout completed:', data);
              router.refresh();
            }
          },
        });

        console.log('Paddle setup complete');
        setPaddleLoaded(true);

        const priceIds = [
          process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_ONE_CREDIT,
          process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_THREE_CREDITS,
          process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_FIVE_CREDITS,
        ];
        console.log('Price IDs:', priceIds);

        if (priceIds.some(id => !id)) {
          throw new Error('Some price IDs are undefined. Check your environment variables.');
        }

        const response = await window.Paddle.PricePreview({ 
          items: priceIds.map(id => ({ priceId: id || '', quantity: 1 }))
        });
        
        if (response && response.data && response.data.details && response.data.details.lineItems) {
          const formattedPrices: PriceData[] = response.data.details.lineItems.map((item: any) => ({
            price: {
              id: item.price.id,
              name: item.price.name || null,
              description: item.price.description || null,
            },
            product: item.product,
            formattedTotals: item.formattedTotals,
          }));
          setPrices(formattedPrices);
        } else {
          throw new Error('Unexpected response format from Paddle');
        }
      } catch (error) {
        console.error('Error initializing Paddle:', error);
        setError(`Error initializing payment system: ${(error as Error).message}`);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error('Paddle object is not available in initializePaddle');
      setError('Payment system is not available. Please refresh the page or try again later.');
      setIsLoading(false);
    }
  }, [router]);

  const handlePurchase = useCallback(async (priceId: string) => {
    if (!user) {
      router.push('/login'); // Redirect to login page if user is not logged in
      return;
    }

    if (!paddleLoaded) {
      setError('Payment system is not fully loaded. Please refresh the page and try again.');
      return;
    }

    setIsPurchasing(true);
    setError(null);

    try {
      console.log('Starting purchase process for price ID:', priceId);
      
      const checkoutOptions = {
        items: [{ priceId, quantity: 1 }],
        customData: { user_id: user.id },
        settings: {
          theme: 'light',
          locale: 'en',
          successUrl: `${window.location.origin}/overview`,
          displayMode: 'overlay' as const,
        },
      };
      
      console.log('Checkout options:', checkoutOptions);

      if (window.Paddle) {
        window.Paddle.Checkout.open(checkoutOptions);
      } else {
        throw new Error('Paddle is not initialized');
      }
    } catch (error) {
      console.error('Error during purchase:', error);
      let errorMessage = 'Failed to process purchase. ';
      if (error instanceof Error) {
        if (error.name) {
          errorMessage += `Error type: ${error.name}. `;
        }
        if (error.message) {
          errorMessage += `${error.message}. `;
        }
      }
      errorMessage += 'Please try again. If the problem persists, contact support.';
      setError(errorMessage);
    } finally {
      setIsPurchasing(false);
    }
  }, [user, paddleLoaded, router]);

  useEffect(() => {
    if (window.Paddle) {
      initializePaddle();
    }
  }, [initializePaddle]);

  const pricingTiers = useMemo(() => [
    {
      name: 'BASIC',
      price: '$35',
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
      price: '$45',
      features: [
        '📸 31 high-quality headshots',
        '⏱ 2-hour processing time',
        '👚 30+ styles',
        '🧘 10+ poses',
      ],
      buttonText: 'Buy Now',
      highlight: true,
      popularTag: '82% pick this plan',
    },
    {
      name: 'PREMIUM',
      price: '$75',
      features: [
        '📸 100 high-quality headshots',
        '⏱ 30-min processing time',
        '👚 40 outfits and backgrounds',
        '🧘 40 poses',
      ],
      buttonText: 'Buy Now',
      bestValueTag: 'Best Value',
    },
  ], []);

  return (
    <div className="bg-white">
      <Script
        src="https://cdn.paddle.com/paddle/v2/paddle.js"
        onLoad={() => {
          console.log('Paddle.js script loaded');
          if (window.Paddle) {
            console.log('Paddle object is available');
            initializePaddle();
          } else {
            console.error('Paddle object is not available');
            setError('Payment system failed to load. Please refresh the page.');
            setIsLoading(false);
          }
        }}
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4">
          Premium quality without premium pricing.
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Save hundreds compared to a photo shoot. Customize your AI professional headshot with 
          manual edits or get a redo if the initial uploads were wrong.
        </p>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        {isLoading ? (
          <p className="text-center">Loading prices...</p>
        ) : prices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div key={tier.name} className={`bg-white rounded-3xl p-8 ${tier.highlight ? 'shadow-xl relative' : ''}`}>
                {tier.popularTag && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[184px] h-[42px] bg-purple-100 text-purple-600 px-5 py-[9px] text-xs rounded-full border-[1.5px] border-purple-600 flex items-center justify-center">
                    {tier.popularTag}
                  </div>
                )}
                {tier.bestValueTag && (
                  <div className="absolute  bg-green-100 text-green-600 w-[124px] h-[42px] px-5 py-[1px] text-xs rounded-tr-[100px] border-t-[1.5px] border-r-[1.5px] border-green-600 flex items-center justify-center">
                    {tier.bestValueTag}
                  </div>
                )}
                <h2 className={`text-xl font-semibold mb-4 ${tier.highlight ? 'text-purple-600' : 'text-blue-600'}`}>
                  {tier.name}
                </h2>
                <p className="text-4xl font-bold mb-1">
                  {tier.price}<span className="text-lg font-normal text-gray-500">/ month</span>
                </p>
                <p className="text-sm text-gray-500 mb-6">billed monthly</p>
                <ul className="mb-8 space-y-3">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2 flex-shrink-0">{feature.split(' ')[0]}</span>
                      <span>{feature.split(' ').slice(1).join(' ')}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handlePurchase(prices[2 - index].price.id)}
                  className={`w-full py-3 rounded-full transition flex items-center justify-center ${
                    tier.highlight
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                  disabled={isPurchasing || !paddleLoaded}
                >
                  {isPurchasing ? 'Processing...' : tier.buttonText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <p className="mt-4 text-sm text-center text-gray-500">No credit card required</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No prices available. Please try again later.</p>
        )}
      </div>
    </div>
  );
};

export default PricingComponent;