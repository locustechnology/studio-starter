'use client'

import React, { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import women from "@/public/testimonial/women.svg";
import men from "@/public/testimonial/men.svg";
import kid from "@/public/testimonial/kid.svg";

type ModelType = 'woman' | 'man' | 'kids';

interface ModelOption {
  value: ModelType;
  label: string;
  imageSrc: string;
}

const modelTypes: ModelOption[] = [
  { value: 'woman', label: 'Woman', imageSrc: women },
  { value: 'man', label: 'Man', imageSrc: men },
  { value: 'kids', label: 'Kids', imageSrc: kid },
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

        console.log('New model inserted successfully');
        console.log('Navigating to img-upload step');
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
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 space-y-8 md:space-y-12">
      <div className="text-center space-y-4 md:space-y-6">
        <h1 className="text-2xl md:text-4xl font-bold leading-tight">
          <span className="text-purple-500">Studio-quality</span> Headshots with <span className="text-black">Gostudio.AI</span>
        </h1>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          Get studio quality headshot in no time and enhance your professional journey.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {modelTypes.map((item) => (
            <div
              key={item.value}
              onClick={() => handleSelectModel(item.value)}
              className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                selectedModel === item.value ? 'border-purple-500 shadow-lg' : 'border-transparent hover:border-purple-300'
              }`}
            >
              <div className="relative h-32 sm:h-40 md:h-48">
                <Image 
                  src={item.imageSrc} 
                  alt={item.label} 
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-2 text-center">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center space-y-4 md:space-y-6">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button 
          onClick={handleContinue}
          disabled={!selectedModel || !name}
          className="px-6 py-2 md:px-10 md:py-3 rounded-full text-base md:text-lg font-semibold bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
        </Button>
        <p className="text-xs md:text-sm text-gray-500">
          By using our AI Tools, you agree to and accept our{' '}
          <Link href="/terms" className="text-purple-500 hover:underline">
            Terms of Use
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ModelTypeSelector;