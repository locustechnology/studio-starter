import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const SummaryPage = () => {
  const [modelData, setModelData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log('SummaryPage useEffect triggered');
    const storedData = localStorage.getItem('trainModelData');
    console.log('Stored data from localStorage:', storedData);
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        console.log('Parsed data from localStorage:', parsedData);
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

  if (isLoading) return <div>Loading...</div>;
  
  if (!modelData) {
    return (
      <div>
        <h1>No Model Data</h1>
        <p>No model data was found. Please go back and create a model first.</p>
        <button onClick={() => router.push('/create-model')}>Create Model</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Summary</h1>
      <p>Model Name: {modelData.modelInfo.name}</p>
      <p>Model Type: {modelData.modelInfo.type}</p>
      <p>Number of Images: {modelData.imageUrls.length}</p>
      {modelData.imageUrls.map((url, index) => (
        <img key={index} src={url} alt={`Sample ${index + 1}`} style={{width: 100, height: 100, objectFit: 'cover'}} />
      ))}
      {modelData.paymentInfo && (
        <div>
          <h2>Payment Information</h2>
          <p>Order ID: {modelData.paymentInfo.orderId}</p>
          <p>Capture ID: {modelData.paymentInfo.captureId}</p>
          <p>Status: {modelData.paymentInfo.status}</p>
        </div>
      )}
    </div>
  );
};

export default SummaryPage;
