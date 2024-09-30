import React, { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';

type ModelType = 'woman' | 'man' | 'kids';

interface ModelOption {
  value: ModelType;
  label: string;
  imageSrc: string;
}

const modelTypes: ModelOption[] = [
  { value: 'woman', label: 'Female', imageSrc: '/path-to-woman-image.jpg' },
  { value: 'man', label: 'Male', imageSrc: '/path-to-man-image.jpg' },
  { value: 'kids', label: 'Kids', imageSrc: '/path-to-kid-image.jpg' },
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
    <div className="w-full max-w-md mx-auto p-4 sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl">
      <div className="text-center space-y-2 sm:space-y-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          <span className="text-purple-500">Studio-quality</span>{' '}
          <span className="text-black">Headshots with Gostudio.AI</span>
        </h1>
        <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
          Get studio quality headshot in no time and enhance your professional journey.
        </p>
      </div>

      <div className="mt-6 sm:mt-8 md:mt-10 space-y-4 sm:space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full rounded-full border-gray-300 focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
          {modelTypes.map((item) => (
            <div
              key={item.value}
              onClick={() => handleSelectModel(item.value)}
              className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
                selectedModel === item.value
                  ? 'ring-2 ring-purple-500 shadow-[0px_3px_10px_0px_#11CAE570]'
                  : 'hover:shadow-sm'
              }`}
            >
              <div className="relative h-24 sm:h-32 md:h-40 lg:h-48 w-full">
                <Image 
                  src={item.imageSrc} 
                  alt={item.label} 
                  layout="fill"
                  objectFit="cover"
                />
                {selectedModel === item.value && (
                  <div className="absolute top-1 right-1 bg-purple-500 rounded-full p-0.5 sm:p-1">
                    <Check className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                  </div>
                )}
              </div>
              <div className="p-1 sm:p-2 text-center text-xs sm:text-sm font-medium">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 sm:mt-8 text-center space-y-3">
        {error && <p className="text-red-500 text-xs sm:text-sm">{error}</p>}
        <p className="text-xs sm:text-sm text-gray-500">
          By using our AI Tools, you agree to and accept our{' '}
          <Link href="/terms" className="text-purple-500 hover:underline">
            Terms of Use
          </Link>
        </p>
        <Button 
          onClick={handleContinue}
          disabled={!selectedModel || !name}
          className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-semibold bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ModelTypeSelector;