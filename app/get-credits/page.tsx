'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Script from 'next/script';

interface Paddle {
  Environment: {
    set: (env: string) => Promise<void>;
  };
  Setup: (options: any) => Promise<void>;
  PricePreview: (options: any) => Promise<any>;
  Checkout: {
    open: (options: any) => void;
  };
}

declare global {
  interface Window {
    Paddle?: Paddle;
  }
}

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

interface User {
  id: string;
  // Add other user properties as needed
}

export default function GetCredits() {
  const [user, setUser] = useState<User | null>(null);
  const [prices, setPrices] = useState<PriceData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [paddleLoaded, setPaddleLoaded] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      } else {
        router.push("/login");
      }
    };

    checkUser();
  }, [router, supabase.auth]);

  const initializePaddle = async () => {
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
              // Refresh the page or update the UI to reflect the new credit balance
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
          const formattedPrices: PriceData[] = response.data.details.lineItems.map(item => ({
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
  };

  const handlePurchase = async (priceId: string) => {
    if (!user) {
      setError('Please log in to make a purchase.');
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
  };

  if (!user) {
    return <div>Loading user...</div>;
  }

  return (
    <>
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
        <h1 className="text-3xl font-bold mb-6">Get Credits</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {isLoading ? (
          <p>Loading prices...</p>
        ) : prices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {prices.map((item: PriceData) => (
              <div key={item.price.id} className="border rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-2">{item.product.name}</h2>
                <p className="text-sm mb-2">{item.product.description}</p>
                <p className="text-2xl font-bold mb-4">{item.formattedTotals.total}</p>
                <button
                  onClick={() => handlePurchase(item.price.id)}
                  className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${isPurchasing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isPurchasing || !paddleLoaded}
                >
                  {isPurchasing ? 'Processing...' : 'Buy Now'}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No prices available. Please try again later.</p>
        )}
      </div>
    </>
  );
}