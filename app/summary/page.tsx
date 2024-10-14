'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

const SummaryPage = () => {
  const [modelData, setModelData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem('trainModelData');
    if (storedData) {
      setModelData(JSON.parse(storedData));
    }
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/astria/train-model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          urls: modelData.imageUrls,
          name: modelData.modelInfo.name,
          type: modelData.modelInfo.type,
        }),
      });

      console.log("Full response:", response);
      const responseText = await response.text();
      console.log("Response text:", responseText);

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Error parsing response:", parseError);
        throw new Error("Invalid response from server");
      }

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit model training");
      }

      console.log('Model training submitted:', result);

      localStorage.removeItem('trainModelData');
      toast.success('Model training started successfully!');
      router.push('/overview');
    } catch (error) {
      console.error('Error submitting model training:', error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!modelData) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Summary</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p className="mb-4"><strong>Model Name:</strong> {modelData.modelInfo.name}</p>
        <p className="mb-4"><strong>Model Type:</strong> {modelData.modelInfo.type}</p>
        <p className="mb-4"><strong>Number of Images:</strong> {modelData.imageUrls.length}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {modelData.imageUrls.map((url, index) => (
            <div key={index} className="relative h-40 w-full">
              <Image 
                src={url} 
                alt={`Sample ${index + 1}`} 
                layout="fill" 
                objectFit="cover" 
                className="rounded"
                loader={({ src }) => src}
                unoptimized
              />
            </div>
          ))}
        </div>
        <button 
          onClick={handleSubmit} 
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isLoading ? 'Starting Training...' : 'Start Training'}
        </button>
      </div>
    </div>
  );
};

export default SummaryPage;
