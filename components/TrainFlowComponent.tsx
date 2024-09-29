'use client'
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ModelTypeSelector } from '@/components/ModelTypeSelector';
import TrainModelZone from '@/components/TrainModelZone';
import GetCreditsPage from '@/app/get-credits/page';

const TrainFlowComponent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [currentStep, setCurrentStep] = useState('');

  useEffect(() => {
    const step = searchParams.get('step');
    console.log('Current URL step parameter:', step);
    setCurrentStep(step || '');
  }, [searchParams]);

  const navigateToNextStep = (nextStep) => {
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
  return <ModelTypeSelector onContinue={() => navigateToNextStep('img-upload')} />;
};

export default TrainFlowComponent;