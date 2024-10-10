'use client'
import { useSearchParams } from 'next/navigation';
import TrainFlowComponent from '@/components/TrainFlowComponent';

export default function TrainPage() {
  const searchParams = useSearchParams();
  const step = searchParams.get('step') || '';

  return (
    <div className="w-full">
      <TrainFlowComponent key={step} />
    </div>
  );
}