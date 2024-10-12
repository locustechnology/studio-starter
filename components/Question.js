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
      answer: "GoStudio.ai uses your own photos to train a custom AI model that represents your appearance and can generate your headshots in various styles and clothing. The quality of the generated headshots depends on the pictures you upload. You should try to have different perspectives of your face, eyes, and various angles. Each picture should represent something new about your appearance and facial features."
    },
    {
      question: "What kind of photos do I need to upload?",
      answer: "Make variety a priority. Varied facial expressions and varied backgrounds, taken at various times of the day, are the keys to high-quality input photos. Oh, and minimal makeup and accessories, please!"
    },
    {
      question: "Who owns my AI photos?",
      answer: "You do. We grant you full commercial license and ownership over your photos."
    },
    {
      question: "How long does an AI headshot take?",
      answer: "We don't cut corners when it comes to generating photorealistic AI headshots. We're not the fastest, but you'll always get same-day results with GoStudio.ai. Our Executive package is delivered in 1 hour or less."
    },
    {
      question: "What if I don't like my photos?",
      answer: "No problem. If you don't get a single profile-worthy headshot, we'll refund your entire purchase. It's our Profile-Worthy guarantee."
    },
    {
      question: "Can I use AI headshots on LinkedIn?",
      answer: "Yes, 25% of GoStudio.ai customers use their AI headshots on LinkedIn. It's totally okay to use AI headshots on LinkedIn."
    },
    {
      question: "What AI should I use for headshots?",
      answer: "The best AI headshot generators are using Flux to maximize realism. Right now, GoStudio.ai is the only major headshot AI powered by Flux. You can get up to 30+ professional AI headshots within 2 hours for just $29."
    },
    {
      question: "Is GoStudio.ai safe for my data?",
      answer: "GoStudio.ai respects your privacy and does not store or access your images beyond the minimum required for processing them. Please reach out if you have any questions about this at hello@gostudio.ai"
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