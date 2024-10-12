'use client'
import React, { useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ModelTypeSelector } from '@/components/ModelTypeSelector';
import TrainModelZone from '@/components/TrainModelZone';
import GetCreditsPage from '@/app/get-credits/page';

const TrainFlowComponent: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [currentStep, setCurrentStep] = useState('img-upload');

  useEffect(() => {
    const step = searchParams.get('step');
    console.log('Current URL step parameter:', step);
    setCurrentStep(step || '');
  }, [searchParams]);

  const navigateToNextStep = (nextStep: string) => {
    console.log('Navigating to next step:', nextStep);
    router.push(`/overview/models/train/corporate-headshots?step=${nextStep}`);
  };

  console.log('Rendering component for step:', currentStep);

  if (currentStep === 'img-upload') {
    return <TrainModelZone onContinue={() => navigateToNextStep('get-credits')} />;
  }

  if (currentStep === 'get-credits') {
    return <GetCreditsPage />;
  }

  // If no step or unknown step, show ModelTypeSelector
  return <ModelTypeSelector packSlug="corporate-headshots" onContinue={() => navigateToNextStep('img-upload')} />;
};

export default TrainFlowComponent;
