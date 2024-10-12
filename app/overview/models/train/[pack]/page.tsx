'use client'

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import ModelTypeSelector from "@/components/ModelTypeSelector";
import TrainModelZone from "@/components/TrainModelZone";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const packsIsEnabled = process.env.NEXT_PUBLIC_TUNE_TYPE === "packs";

// Remove this interface and component as they're not being used
// interface TrainModelZoneProps {
//   packSlug: string;
// }

// const TrainModelZoneComponent: React.FC<TrainModelZoneProps> = ({ packSlug }) => {
//   // ... component logic ...

//   return (
//     <div>
//       {/* Your component JSX goes here */}
//       <p>Train Model Zone for pack: {packSlug}</p>
//     </div>
//   );
// };

const Page = ({ params }: { params: { pack: string } }) => {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState('');

  useEffect(() => {
    const step = searchParams.get('step');
    console.log('Current step:', step);
    setCurrentStep(step || '');
  }, [searchParams]);

  const renderStep = () => {
    switch (currentStep) {
      case 'img-upload':
        return <TrainModelZone packSlug={params.pack} />;
      default:
        return <ModelTypeSelector packSlug={params.pack} />;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        id="train-model-container"
        className="flex flex-1 flex-col gap-2 px-2"
      >
        {packsIsEnabled && (
          <Link href="/overview/packs" className="text-sm w-fit">
            <Button variant="outline">
              <FaArrowLeft className="mr-2" />
              Go Back
            </Button>
          </Link>
        )}
        
        <div className="mt-6">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default Page;
