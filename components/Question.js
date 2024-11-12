'use client'
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, toggleOpen }) => (
  <div className={`mb-4 overflow-hidden rounded-lg ${isOpen ? 'bg-white shadow-md' : 'bg-gray-50'}`}>
    <button
      className="flex justify-between items-center w-full text-left p-4"
      onClick={toggleOpen}
    >
      <span className={`text-sm sm:text-base lg:text-lg font-medium ${isOpen ? 'text-indigo-600' : 'text-gray-900'}`}>{question}</span>
      <div className={`${isOpen ? 'bg-black' : 'bg-indigo-600'} rounded-full p-1 flex-shrink-0 ml-2`}>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        ) : (
          <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        )}
      </div>
    </button>
    {isOpen && (
      <div className="px-4 pb-4">
        <p className="text-gray-600 text-sm sm:text-base">{answer}</p>
      </div>
    )}
  </div>
);

const PurpleAccentFAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What is GoStudio.ai? How does it work?",
      answer: "GoStudio.ai uses your product photos to create stunning professional product shots in various styles and settings. The quality of the generated images depends on the pictures you upload. You should provide clear photos of your product from different angles, showing details and textures. Each picture should capture different aspects of your product's features."
    },
    {
      question: "What kind of photos do I need to upload?",
      answer: "Quality and clarity are key. Upload well-lit photos of your product against a simple background, showing different angles and details. Make sure to capture the true colors and textures. We recommend 3-5 high-resolution photos for best results."
    },
    {
      question: "Who owns my AI product photos?",
      answer: "You do. We grant you full commercial license and ownership over your product photos, perfect for your e-commerce and marketing needs."
    },
    {
      question: "How long does AI product photography take?",
      answer: "We prioritize quality and realism in our AI-generated product photos. You'll receive same-day results with GoStudio.ai, and our Enterprise package delivers in 30 minutes or less."
    },
    {
      question: "What if I don't like my photos?",
      answer: "No problem. If you don't get a single marketplace-ready product photo, we'll refund your entire purchase. It's our E-commerce Ready guarantee."
    },
    {
      question: "Can I use these photos on Amazon and other marketplaces?",
      answer: "Yes! Over 40% of GoStudio.ai customers use their AI product photos on Amazon, Shopify, and other e-commerce platforms. Our photos meet marketplace quality standards."
    },
    {
      question: "What makes GoStudio.ai's product photos special?",
      answer: "GoStudio.ai uses advanced Flux AI technology to create ultra-realistic product photos. We're the only major product photography AI powered by Flux, offering 20+ professional product shots within 2 hours for just $29."
    },
    {
      question: "Is GoStudio.ai safe for my product data?",
      answer: "GoStudio.ai respects your intellectual property and does not store or access your product images beyond the minimum required for processing them. Please reach out if you have any questions about this at hello@gostudio.ai"
    }
  ];

  return (
    <div className="bg-white w-full mx-auto py-10 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 rounded-[24px]">
      <div className="max-w-[1116px] mx-auto bg-white  rounded-[24px]">
        <div className="flex flex-col gap-20 p-8 sm:p-12 lg:p-16">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 text-center font-jakarta">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={index === openIndex}
                toggleOpen={() => setOpenIndex(index === openIndex ? -1 : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurpleAccentFAQSection;