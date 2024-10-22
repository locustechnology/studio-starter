'use client'
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ModelTypeSelector } from '@/components/ModelTypeSelector';
import TrainModelZone from '@/components/TrainModelZone';
import GetCreditsPage from '@/app/get-credits/page';

const TrainFlowComponent: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState('img-upload');
  const [hasEnoughCredits, setHasEnoughCredits] = useState(true);

  useEffect(() => {
    const step = searchParams.get('step');
    console.log('Current URL step parameter:', step);
    setCurrentStep(step || 'img-upload');

    // Check credits when component mounts
    checkCredits();
  }, [searchParams]);

  const checkCredits = async () => {
    try {
      const response = await fetch('/astria/train-model', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          checkCredits: true,
        }),
      });
      const data = await response.json();
      setHasEnoughCredits(response.ok);
      
      if (response.status === 402) {
        navigateToNextStep('get-credits');
      }
    } catch (error) {
      console.error('Error checking credits:', error);
    }
  };

  const navigateToNextStep = (nextStep: string) => {
    console.log('Navigating to next step:', nextStep);
    router.push(`/overview/models/train/corporate-headshots?step=${nextStep}`);
  };

  console.log('Rendering component for step:', currentStep);

  if (currentStep === 'img-upload') {
    return (
      <TrainModelZone 
        onContinue={async () => {
          await checkCredits();
          if (hasEnoughCredits) {
            // If user has enough credits, proceed with model training
            // Add your model training logic here
            console.log('Proceeding with model training');
          } else {
            navigateToNextStep('get-credits');
          }
        }} 
      />
    );
  }

  if (currentStep === 'get-credits') {
    return <GetCreditsPage onCreditsPurchased={() => {
      setHasEnoughCredits(true);
      navigateToNextStep('img-upload');
    }} />;
  }

  // If no step or unknown step, show ModelTypeSelector
  return <ModelTypeSelector onContinue={() => navigateToNextStep('img-upload')} />;
};

export default TrainFlowComponent;