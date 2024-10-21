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

type ModelType = 'woman' | 'man';

interface ModelOption {
  value: ModelType;
  label: string;
  imageSrc: any;
}

const modelTypes: ModelOption[] = [
  { value: 'woman', label: 'Female', imageSrc: gender },
  { value: 'man', label: 'Male', imageSrc: malegender },
];

export const ModelTypeSelector: React.FC = () => {
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

        // Store the model info in localStorage
        localStorage.setItem('modelInfo', JSON.stringify({
          name: name,
          type: selectedModel,
          user_id: user.id,
        }));

        // Save the gender in localStorage
        localStorage.setItem('gender', selectedModel);

        router.push(`/overview/models/train/corporate-headshots?step=img-upload`);
      } catch (error) {
        console.error('Unexpected error:', error);
        setError('An unexpected error occurred. Please try again.');
      }
    } else {
      setError('Please enter your name and select a model type before continuing.');
    }
  }, [selectedModel, name, supabase, router]);

  return (
    <div className="min-h-screen flex items-start sm:items-center justify-center pt-4 sm:pt-0">
      <div className="w-full max-w-[382px] sm:max-w-none sm:w-[1275px] bg-white rounded-[24px] sm:rounded-[16px] shadow-lg p-4 sm:p-8 font-poppins">
        <div className="w-full sm:w-[1011px] mx-auto space-y-4 sm:space-y-6">
          <div className="text-center space-y-1 sm:space-y-4">
            <h1 className="text-2xl sm:text-4xl font-bold leading-tight font-jakarta">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4]">Studio-quality</span>{' '}
              <span className="text-black">Headshots with Gostudio.AI</span>
            </h1>
            <p className="text-xs sm:text-lg text-gray-600 px-4 sm:px-0">
              Get studio quality headshot in no time and enhance your professional journey.
            </p>
          </div>

          <div className="flex flex-col items-start w-full sm:w-[612px] mx-auto px-4 sm:px-0">
            <label htmlFor="name" className="block text-base sm:text-20px font-medium sm:font-500 text-gray-700 font-poppins leading-30px mb-1 sm:mb-2">
              Name
            </label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full h-[50px] rounded-[16px] border-[1px] border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-base sm:text-base py-2 px-4"
            />
          </div>

          <div className="flex justify-center gap-4 sm:gap-[41px] mt-4 sm:mt-6">
            {modelTypes.map((item) => (
              <div key={item.value} className="flex flex-col items-center">
                <div
                  onClick={() => handleSelectModel(item.value)}
                  className={`
                    cursor-pointer rounded-2xl overflow-hidden transition-all duration-300
                    w-[120px] h-[120px] sm:w-[188px] sm:h-[188px] relative
                    ${selectedModel === item.value 
                      ? 'ring-2 ring-[#11CAE5] shadow-[0px_6.58px_65.25px_0px_#11CAE570]' 
                      : 'hover:ring-2 hover:ring-[#11CAE5]'}
                  `}
                >
                  <Image 
                    src={item.imageSrc} 
                    alt={item.label} 
                    layout="fill"
                    objectFit="cover"
                  />
                  {selectedModel === item.value && (
                    <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-white rounded-full p-0.5 sm:p-1">
                      <Check className="h-3 w-3 sm:h-4 sm:w-4 text-[#11CAE5]" />
                    </div>
                  )}
                </div>
                <div className="mt-2 text-center text-sm sm:text-sm font-medium font-jakarta">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center space-y-3 sm:space-y-4 mt-4 sm:mt-6 px-4 sm:px-0">
            <p className="text-[10px] sm:text-xs text-gray-500">
              By using our AI Tools, you agree to and accept our{' '}
              <Link href="/terms" className="text-purple-500 hover:underline">
                Terms of Use
              </Link>
            </p>
            <div className="flex justify-center">
              <Button 
                onClick={handleContinue}
                disabled={!selectedModel || !name}
                className="w-[240px] h-[50px] bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] rounded-full text-sm sm:text-base font-semibold disabled:cursor-not-allowed flex items-center justify-center gap-2 font-jakarta"
              >
                Continue
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelTypeSelector;
