import React, { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import gender from "@/public/gender.svg"
import malegender from "@/public/malegenedr.svg"

type ModelType = 'woman' | 'man' | 'kids';

interface ModelOption {
  value: ModelType;
  label: string;
  imageSrc: any;
}

const modelTypes: ModelOption[] = [
  { value: 'woman', label: 'Female', imageSrc: gender },
  { value: 'man', label: 'Male', imageSrc: malegender },
];

export const ModelTypeSelector = ({ packSlug }: { packSlug: string }) => {
  const [name, setName] = useState('');
  const [selectedModel, setSelectedModel] = useState<ModelType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const supabase = useMemo(() => createClientComponentClient(), []);

  const handleSelectModel = useCallback((value: ModelType) => {
    setSelectedModel(value);
    setError(null);
  }, []);

  const handleContinue = useCallback(async () => {
    if (selectedModel && name) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setError('User not authenticated. Please log in.');
          return;
        }

        const { error } = await supabase
          .from('models')
          .insert({
            name: name,
            type: selectedModel,
            user_id: user.id,
            status: 'processing'
          });

        if (error) {
          console.error('Supabase error:', error);
          setError('An error occurred while saving. Please try again.');
          return;
        }

        router.push(`/overview/models/train/${packSlug}?step=img-upload`);
      } catch (error) {
        console.error('Unexpected error:', error);
        setError('An unexpected error occurred. Please try again.');
      }
    } else {
      setError('Please enter your name and select a model type before continuing.');
    }
  }, [selectedModel, name, supabase, router, packSlug]);

  return (
    <div className="min-h-screen  flex items-start sm:items-center justify-center pt-4 sm:pt-0">
      <div className="w-full max-w-[382px] sm:max-w-none sm:w-[1275px] bg-white rounded-[24px] sm:rounded-[16px] shadow-lg p-4 sm:p-8 font-poppins">
        <div className="w-full sm:w-[1011px] mx-auto space-y-3 sm:space-y-6">
          <div className="text-center space-y-1 sm:space-y-4">
            <h1 className="text-xl sm:text-4xl font-bold leading-tight font-jakarta">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4]">Studio-quality</span>{' '}
              <span className="text-black">Headshots with Gostudio.AI</span>
            </h1>
            <p className="text-xs sm:text-lg text-gray-600">
              Get studio quality headshot in no time and enhance your professional journey.
            </p>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <label htmlFor="name" className="block text-20px sm:text-20px font-500 text-gray-700 font-poppins leading-30px">Name</label>
            <div className="flex justify-center">
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-[612px] h-[74px] rounded-[16px] border-[1px] border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base py-1 sm:py-2 px-3 sm:px-4"
              />
            </div>
          </div>

          <div className="flex justify-center gap-3 sm:gap-[41px]">
            {modelTypes.map((item) => (
              <div key={item.value} className="flex flex-col items-center">
                <div
                  onClick={() => handleSelectModel(item.value)}
                  className={`
                    cursor-pointer rounded-2xl overflow-hidden transition-all duration-300
                    w-[120px] h-[120px] sm:w-[188px] sm:h-[188px] relative
                    ${selectedModel === item.value ? 'border-2 border-transparent hover:shadow-[0px_6.58px_65.25px_0px_#11CAE570]' : ''}
                  `}
                  style={{
                    backgroundImage: selectedModel === item.value
                      ? 'linear-gradient(90deg, #8371FF -39.48%, #A077FE 15.54%, #01C7E4 100%)'
                      : 'none',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'content-box, border-box',
                  }}
                >
                  <div className={`absolute inset-[2px] rounded-2xl overflow-hidden ${selectedModel === item.value ? 'border-2 border-white' : ''}`}>
                    <Image 
                      src={item.imageSrc} 
                      alt={item.label} 
                      layout="fill"
                      objectFit="cover"
                    />
                    {selectedModel === item.value && (
                      <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-white rounded-full p-0.5 sm:p-1">
                        <Check className="h-2 w-2 sm:h-4 sm:w-4 text-purple-500" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-1 sm:mt-2 text-center text-xs sm:text-sm font-medium font-jakarta">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center space-y-2 sm:space-y-4">
            <p className="text-[8px] sm:text-xs text-gray-500">
              By using our AI Tools, you agree to and accept our{' '}
              <Link href="/terms" className="text-purple-500 hover:underline">
                Terms of Use
              </Link>
            </p>
            <div className="flex justify-center"> {/* Added this wrapper div */}
              <Button 
                onClick={handleContinue}
                disabled={!selectedModel || !name}
                className="w-full sm:w-[240px] h-[40px] sm:h-[50px] bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] rounded-full text-xs sm:text-base font-semibold disabled:cursor-not-allowed flex items-center justify-center gap-2 font-jakarta"
              >
                Continue
                <ArrowRight className="h-3 w-3 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelTypeSelector;