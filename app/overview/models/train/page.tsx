'use client'
import { useSearchParams } from 'next/navigation';

export default function TrainPage() {
  const searchParams = useSearchParams();
  const step = searchParams?.get('step') || '';

  return (
    <div className="w-full">
      {/* Your component JSX */}
      
      
    </div>
  );
}
