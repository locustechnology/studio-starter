'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import ModelTypeSelector from "@/components/ModelTypeSelector";
import TrainModelZone from "@/components/TrainModelZone";

interface PageProps {
  params: { pack: string }
}

export default function TrainModelPage({ params }: PageProps) {
  const [currentStep, setCurrentStep] = useState('');
  const searchParams = useSearchParams();

  const getStep = useCallback(() => {
    const step = searchParams?.get('step');
    return step || '';
  }, [searchParams]);

  useEffect(() => {
    const step = getStep();
    console.log('Current step:', step);
    setCurrentStep(step);
  }, [getStep]);

  const handleContinue = () => {
    // Add your logic here for what should happen when continue is clicked
    console.log('Continuing to next step');
    // For example, you might want to update the current step:
    setCurrentStep('img-upload');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'img-upload':
        return <TrainModelZone packSlug={params.pack} onContinue={handleContinue} />;
      default:
        return <ModelTypeSelector onContinue={handleContinue} />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {renderStep()}
    </div>
  );
}
