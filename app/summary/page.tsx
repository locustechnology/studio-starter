'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

interface ModelData {
  modelInfo: {
    name: string;
    type: string;
    gender?: string;
    address?: string;
  };
  imageUrls: string[];
  paymentInfo?: {
    orderId: string;
    captureId: string;
    status: string;
  };
}

const SummaryPage = () => {
  const [modelData, setModelData] = useState<ModelData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log('SummaryPage useEffect triggered');
    const storedData = localStorage.getItem('trainModelData');
    console.log('Raw stored data from localStorage:', storedData);
  
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        console.log('Parsed data in SummaryPage:', parsedData);
        if (!parsedData.modelInfo) parsedData.modelInfo = {};
        if (!parsedData.imageUrls) parsedData.imageUrls = [];
        setModelData(parsedData);
      } catch (error) {
        console.error('Error parsing stored data:', error);
        toast.error('Error loading model data');
      }
    } else {
      console.log('No stored data found in localStorage');
      toast.error('No model data found');
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = async () => {
    if (!modelData) {
      toast.error('No model data found');
      return;
    }

    try {
      const response = await fetch("/astria/train-model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(modelData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit model data');
      }

      const result = await response.json();
      console.log('Model training initiated:', result);

      // Clear localStorage after successful submission
      localStorage.removeItem('trainModelData');
      localStorage.removeItem('modelInfo');

      toast.success('Model data submitted successfully');
      router.push('/overview');
    } catch (error) {
      console.error('Error submitting model data:', error instanceof Error ? error : new Error(String(error)));
      toast.error(`Failed to submit model data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!modelData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Jakarta Sans, sans-serif' }}>No Model Data</h1>
        <p className="mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>No model data was found. Please go back and create a model first.</p>
        <button 
          onClick={() => router.push('/overview/models/train/corporate-headshots')} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Model
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-4 sm:pt-[80px] pb-4 sm:pb-[80px]">
      <div className="max-w-[1274px] mx-auto bg-white rounded-lg sm:rounded-[40px] shadow-lg overflow-hidden">
        <div className="px-4 sm:px-[80px] py-6 sm:py-[60px]">
          <div className="max-w-full sm:max-w-[1104px] mx-auto mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center" style={{ fontFamily: 'Jakarta Sans, sans-serif' }}>Check-Out Summary</h1>
            <p className="text-sm sm:text-base text-gray-600 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Save hundreds compared to a photo shoot. Customize your AI professional
              headshot with manual edits or get a redo if the initial uploads were wrong.
            </p>
          </div>
          
          {/* Payment Detail Section */}
          <div className="bg-white shadow-md rounded-lg sm:rounded-[40px] px-4 sm:px-[42px] py-6 sm:py-[42px] mb-8 sm:mb-12">
            <h2 className="text-indigo-600 font-semibold mb-4" style={{ fontFamily: 'Jakarta Sans, sans-serif' }}>STANDARD PACK</h2>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="mb-4 sm:mb-0">
                <span className="text-3xl sm:text-4xl font-bold text-indigo-600" style={{ fontFamily: 'Jakarta Sans, sans-serif' }}>$19</span>
                <span className="text-lg sm:text-xl text-gray-400 line-through ml-2" style={{ fontFamily: 'Poppins, sans-serif' }}>$45</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 sm:gap-x-16">
                <div className="flex items-center">
                  <span className="mr-2"></span>
                  <span style={{ fontFamily: 'Poppins, sans-serif' }}>60 high-quality headshots</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2"></span>
                  <span style={{ fontFamily: 'Poppins, sans-serif' }}>20 outfits and backgrounds</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2"></span>
                  <span style={{ fontFamily: 'Poppins, sans-serif' }}>1-hour processing time</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2"></span>
                  <span style={{ fontFamily: 'Poppins, sans-serif' }}>20 poses</span>
                </div>
              </div>
            </div>
          </div>
          
          <h2 className="text-indigo-600 font-semibold mb-2" style={{ fontFamily: 'Jakarta Sans, sans-serif' }}>BILLING ADDRESS</h2>
          <div className="mb-8 sm:mb-12">
            <p className="text-base sm:text-lg mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}><strong>{modelData.modelInfo.name}</strong></p>
            <p className="text-base sm:text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>{modelData.modelInfo.address || 'Address not provided'}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row mb-8 sm:mb-12">
            <div className="w-full sm:w-1/2 mb-6 sm:mb-0">
              <h2 className="text-indigo-600 font-semibold mb-2" style={{ fontFamily: 'Jakarta Sans, sans-serif' }}>GENDER</h2>
              <div className="relative w-full sm:w-[200px] h-[200px] rounded-lg overflow-hidden mb-2">
                <Image 
                  src={modelData.imageUrls[0] || '/placeholder.jpg'} 
                  alt="Gender representation" 
                  layout="fill" 
                  objectFit="cover"
                />
              </div>
              <p className="text-base sm:text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>{modelData.modelInfo.gender || 'Not specified'}</p>
            </div>
            <div className="w-full sm:w-1/2">
              <h2 className="text-indigo-600 font-semibold mb-2" style={{ fontFamily: 'Jakarta Sans, sans-serif' }}>UPLOADED PHOTOS</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {modelData.imageUrls.slice(0, 6).map((url, index) => (
                  <div key={index} className="relative w-full h-[150px] sm:h-[200px] rounded-lg overflow-hidden">
                    <Image 
                      src={url} 
                      alt={`Sample ${index + 1}`} 
                      layout="fill" 
                      objectFit="cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={handleSubmit} 
              className="w-full sm:w-[195px] h-[48px] rounded-[50px] text-white font-bold focus:outline-none focus:shadow-outline"
              style={{
                background: 'linear-gradient(90deg, #8371FF -39.48%, #A077FE 32.07%, #01C7E4 100%)',
                padding: '12px 25px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Start Training
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
