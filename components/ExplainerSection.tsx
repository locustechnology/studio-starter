
      {/* <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>

      {/* Step 1: Upload your images */}
      {/* <div className="space-y-4">
        <div className="flex items-center justify-center space-x-4">
          <div className="text-3xl font-bold text-blue-600 bg-white border-2 border-blue-600 rounded-full w-10 h-10 flex items-center justify-center">
            1
          </div>
          <h3 className="text-2xl font-semibold">Upload a few photos</h3>
        </div>
        <p className="text-sm text-gray-600 text-center">
        Upload a few photos of yourself, and we'll take care of the rest.
        </p>
        <Image
          src={resulte}
          alt="AI Headshot example"
          className="rounded-lg object-cover w-full md:w-3/4 lg:w-1/2 mx-auto"
        />
      </div> */}

      {/* Step 2: Train your model */}
      {/* <div className="space-y-4">
        <div className="flex items-center justify-center space-x-4">
          <div className="text-3xl font-bold text-blue-600 bg-white border-2 border-blue-600 rounded-full w-10 h-10 flex items-center justify-center">
            2
          </div>
          <h3 className="text-2xl font-semibold">Our AI gets to work</h3>
        </div>
        <p className="text-sm text-gray-600 text-center">
        <p className="text-sm text-gray-600 text-center">
        We use cutting-edge technology built by AI researchers <br/>from
        Meta and Microsoft to create your headshots.        </p>
        </p>
        <Image
          src={Group}
          alt="AI Headshot blur"
          className="rounded-lg object-cover w-full md:w-3/4 lg:w-1/2 mx-auto"
        />
      </div> */}

      {/* Step 3: Generate images */}
      {/* <div className="space-y-4">
        <div className="flex items-center justify-center space-x-4">
          <div className="text-3xl font-bold text-blue-600 bg-white border-2 border-blue-600 rounded-full w-10 h-10 flex items-center justify-center">
            3
          </div>
          <h3 className="text-2xl font-semibold">Download favourite Headshots</h3>
        </div>
        <p className="text-sm text-gray-600 text-center">
        You'll receive different backgrounds, poses, and styles to choose<br/>
        the perfect AI headshot. Ready for all use cases, from personal<br/>
        to the most professional.        </p>
        <Image
          src={exampl}
          alt="AI Headshot result"
          className="rounded-lg object-cover w-full md:w-3/4 lg:w-1/2 mx-auto"
        />
      </div> */} 

import React from 'react';
import Image from 'next/image';
import step1 from "@/public/Step1.svg"
import step3 from "@/public/step3.svg"
import blur from "@/public/blur.svg"

const AIHeadshotPage = () => {
  return (
    <div className="w-full min-h-screen bg-white text-black rounded-[60px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <div className="space-y-20 sm:space-y-32 lg:space-y-48">
          {/* Section 1: Upload Photos */}
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold font-['Plus Jakarta Sans']">Upload a few photos</h2>
              <p className="text-xl text-gray-600 font-['Poppins']">Upload a few photos of yourself, and we'll take care of the rest.</p>
            </div>
            <div className="w-full">
              <Image src={step1} alt="Upload photos" layout="responsive" width={500} height={300} />
            </div>
          </section>

          {/* Section 2: AI Processing */}
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold font-['Plus Jakarta Sans']">Our AI gets to work</h2>
              <p className="text-xl text-gray-600 font-['Poppins']">We use cutting-edge technology built by AI researchers from Meta and Microsoft to create your headshots.</p>
            </div>
            <div className="w-full">
              <Image src={blur} alt="AI processing" layout="responsive" width={500} height={300} />
            </div>
          </section>

          {/* Section 3: Download Headshots */}
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold font-['Plus Jakarta Sans']">Download favourite Headshots</h2>
              <p className="text-xl text-gray-600 font-['Poppins']">You'll receive different backgrounds, poses, and styles to choose the perfect AI headshot. Ready for all use cases, from personal to the most professional.</p>
            </div>
            <div className="w-full">
              <Image src={step3} alt="Download headshots" layout="responsive" width={500} height={300} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AIHeadshotPage;
