import React from 'react';
import { Camera, Clock, Shield, CheckCircle } from 'lucide-react';

interface HeadshotCardProps {
  imageUrl: string;
}

const HeadshotCard: React.FC<HeadshotCardProps> = ({ imageUrl }) => (
  <div className="w-24 h-32 rounded-lg overflow-hidden">
    <img src={imageUrl} alt="AI Headshot" className="w-full h-full object-cover" />
  </div>
);

interface FeatureItemProps {
  Icon: React.ComponentType<{ className?: string }>;
  text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ Icon, text }) => (
  <div className="flex items-center space-x-2">
    <Icon className="w-5 h-5 text-indigo-600" />
    <span className="text-sm text-gray-600">{text}</span>
  </div>
);

export default function AIHeadshotsLandingPage() {
  const headshots = [
    "/api/placeholder/192/256",
    "/api/placeholder/192/256",
    "/api/placeholder/192/256",
    "/api/placeholder/192/256",
    "/api/placeholder/192/256",
    "/api/placeholder/192/256",
    "/api/placeholder/192/256",
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-4">
        Professional Headshots done with AI<br />at your home.
      </h1>
      <p className="text-xl text-center text-gray-600 mb-8">
        Transform your photos into high-quality, professional<br />headshots effortlessly.
      </p>
      
      <div className="flex justify-center space-x-8 mb-8">
        <FeatureItem Icon={Camera} text="Pick from 150+ styles" />
        <FeatureItem Icon={Clock} text="Done in less than 1 hour" />
        <FeatureItem Icon={Shield} text="Strict data protection" />
        <FeatureItem Icon={CheckCircle} text="Guaranteed results" />
      </div>
      
      <div className="flex justify-center space-x-4 mb-12">
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition">
          Get Started For Free →
        </button>
        <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition">
          Watch Video Demo
        </button>
      </div>
      
      <div className="flex justify-center space-x-4 overflow-x-auto">
        {headshots.map((url, index) => (
          <HeadshotCard key={index} imageUrl={url} />
        ))}
      </div>
    </div>
  );
}