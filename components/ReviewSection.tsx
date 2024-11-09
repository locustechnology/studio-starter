import React from 'react';
import Image from 'next/image';



  // First, let's define the type for our testimonial
  interface Testimonial {
    image?: string;
    rating: number;
    text: string;
  }



const testimonials: Testimonial[] = [
  {
    image: '/reviews/oil.png',
    rating: 5,
    text: 'The results are stunning and tailored—this AI knows what looks good for my products.'
  },
  {
    text: 'Great range of styles. I love how the platform gives several options after uploading a single image. It\'s easy to pick a style or background that matches my aesthetic. Still, the convenience of multiple results and the overall quality are worth it! It\'s a time-saver, especially if you need variety for social media.',
    rating: 5
  },
  {
    image: '/reviews/sunscreen.jpeg',
    rating: 5,
    text: 'A must-have tool for e-commerce!'
  },
  {
    image: '/reviews/juice.png',
    rating: 5,
    text: 'Upload once, and you get so many options to pick from.'
  },
  {
    image: '/reviews/skincare.png',
    rating: 5,
    text: 'The AI is incredibly smart at generating diverse images. It\'s like having a mini photo studio!'
  },
  {
    text: 'Perfect for my online store! As an online retailer, high-quality product images are crucial. I uploaded a few photos of my jewelry, and the AI generated multiple stunning options that showcased the pieces beautifully. The variety allowed me to select different backgrounds and angles to highlight my products effectively.',
    rating: 5
  },
  {
    image: '/reviews/perfume.png',
    rating: 5,
    text: 'Amazing Product Photo generator site ever!'
  },
  {
    image: '/reviews/drink.png',
    rating: 5,
    text: 'Great for quick product photos!'
  },
  {
    image: '/reviews/bottle.png',
    rating: 5,
    text: 'A must-have tool for e-commerce!'
  }
];


// Star SVG Components
const FullStar = () => (
    <svg 
      className="w-[18px] h-[18px]" 
      viewBox="0 0 18 18" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M8.49751 1.44954C8.77008 0.877484 9.61123 0.877484 9.8838 1.44954L11.8264 5.53644C11.9265 5.74772 12.1282 5.89608 12.3617 5.92899L16.8859 6.61635C17.5235 6.71384 17.7835 7.50961 17.3197 7.95557L14.0497 11.1C13.8818 11.2616 13.8063 11.4974 13.8456 11.7298L14.6705 16.2301C14.7857 16.8641 14.1093 17.3537 13.5381 17.0486L9.49674 14.8991C9.28641 14.7863 9.03491 14.7863 8.82457 14.8991L4.78324 17.0486C4.21203 17.3537 3.53562 16.8641 3.65077 16.2301L4.47573 11.7298C4.51498 11.4974 4.43951 11.2616 4.27161 11.1L1.00163 7.95557C0.537826 7.50961 0.797863 6.71384 1.43544 6.61635L5.95959 5.92899C6.19312 5.89608 6.39483 5.74772 6.49494 5.53644L8.49751 1.44954Z" 
        fill="#FFB800"
      />
    </svg>
  );
  
  const HalfStar = () => (
    <svg 
      className="w-[18px] h-[18px]" 
      viewBox="0 0 18 18" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M8.49751 1.44954C8.77008 0.877484 9.61123 0.877484 9.8838 1.44954L11.8264 5.53644C11.9265 5.74772 12.1282 5.89608 12.3617 5.92899L16.8859 6.61635C17.5235 6.71384 17.7835 7.50961 17.3197 7.95557L14.0497 11.1C13.8818 11.2616 13.8063 11.4974 13.8456 11.7298L14.6705 16.2301C14.7857 16.8641 14.1093 17.3537 13.5381 17.0486L9.49674 14.8991C9.28641 14.7863 9.03491 14.7863 8.82457 14.8991L4.78324 17.0486C4.21203 17.3537 3.53562 16.8641 3.65077 16.2301L4.47573 11.7298C4.51498 11.4974 4.43951 11.2616 4.27161 11.1L1.00163 7.95557C0.537826 7.50961 0.797863 6.71384 1.43544 6.61635L5.95959 5.92899C6.19312 5.89608 6.39483 5.74772 6.49494 5.53644L8.49751 1.44954Z" 
        fill="url(#half-star)"
      />
      <defs>
        <linearGradient id="half-star" x1="0" x2="18" y1="0" y2="0">
          <stop offset="50%" stopColor="#FFB800" />
          <stop offset="50%" stopColor="#D9D9D9" />
        </linearGradient>
      </defs>
    </svg>
  );
  
  const EmptyStar = () => (
    <svg 
      className="w-[18px] h-[18px]" 
      viewBox="0 0 18 18" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M8.49751 1.44954C8.77008 0.877484 9.61123 0.877484 9.8838 1.44954L11.8264 5.53644C11.9265 5.74772 12.1282 5.89608 12.3617 5.92899L16.8859 6.61635C17.5235 6.71384 17.7835 7.50961 17.3197 7.95557L14.0497 11.1C13.8818 11.2616 13.8063 11.4974 13.8456 11.7298L14.6705 16.2301C14.7857 16.8641 14.1093 17.3537 13.5381 17.0486L9.49674 14.8991C9.28641 14.7863 9.03491 14.7863 8.82457 14.8991L4.78324 17.0486C4.21203 17.3537 3.53562 16.8641 3.65077 16.2301L4.47573 11.7298C4.51498 11.4974 4.43951 11.2616 4.27161 11.1L1.00163 7.95557C0.537826 7.50961 0.797863 6.71384 1.43544 6.61635L5.95959 5.92899C6.19312 5.89608 6.39483 5.74772 6.49494 5.53644L8.49751 1.44954Z" 
        fill="#D9D9D9"
      />
    </svg>
  );
  
  // Update the RatingStars component to ensure it handles the rating properly
const RatingStars = ({ rating }: { rating: number }) => {
    console.log('Rating received:', rating); // Add this for debugging
    
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);
  
    return (
      <div className="flex gap-[2px]">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <FullStar key={`full-${i}`} />
        ))}
        
        {/* Half star */}
        {hasHalfStar && <HalfStar />}
        
        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <EmptyStar key={`empty-${i}`} />
        ))}
      </div>
    );
  };
  
  
  // Update the ReviewCard component to explicitly pass the rating
const ReviewCard = ({ review }: { review: Testimonial }) => {
    return (
      <div className="rounded-[20px] border border-[rgba(10,23,39,0.1)] overflow-hidden h-auto">
        {review.image ? (
          <div className="relative aspect-square w-full">
            <Image
              src={review.image}
              alt="Review image"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute top-4 left-4 bg-white rounded-full px-3 py-1.5 text-sm flex items-center gap-2 shadow-sm">
              <div className="w-1.5 h-1.5 bg-[#2B87FF] rounded-full"></div>
              <span className="text-[13px] font-medium">GoStudio.ai</span>
            </div>
          </div>
        ) : null}
        
        <div className="p-4 space-y-2 bg-white">
          <div className="flex gap-[2px]">
            {[...Array(review.rating || 5)].map((_, i) => (
              <svg 
                key={i} 
                className="w-[18px] h-[18px]" 
                viewBox="0 0 18 18" 
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M8.49751 1.44954C8.77008 0.877484 9.61123 0.877484 9.8838 1.44954L11.8264 5.53644C11.9265 5.74772 12.1282 5.89608 12.3617 5.92899L16.8859 6.61635C17.5235 6.71384 17.7835 7.50961 17.3197 7.95557L14.0497 11.1C13.8818 11.2616 13.8063 11.4974 13.8456 11.7298L14.6705 16.2301C14.7857 16.8641 14.1093 17.3537 13.5381 17.0486L9.49674 14.8991C9.28641 14.7863 9.03491 14.7863 8.82457 14.8991L4.78324 17.0486C4.21203 17.3537 3.53562 16.8641 3.65077 16.2301L4.47573 11.7298C4.51498 11.4974 4.43951 11.2616 4.27161 11.1L1.00163 7.95557C0.537826 7.50961 0.797863 6.71384 1.43544 6.61635L5.95959 5.92899C6.19312 5.89608 6.39483 5.74772 6.49494 5.53644L8.49751 1.44954Z" 
                  fill="#FFB800"
                />
              </svg>
            ))}
          </div>
          <p className="text-[15px] leading-[22px] text-[#475467]">{review.text}</p>
        </div>
      </div>
    );
  };
  

  const ReviewSection = () => {
    return (
      <div className="w-full max-w-[1276px] mx-auto bg-white rounded-[24px] sm:rounded-[60px] py-[18px] sm:py-20 px-4 sm:px-8 lg:px-10 font-poppins">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-6">
            <h2 className="text-gray-500 font-semibold font-jakarta">TESTIMONIALS</h2>
            
            <h1 className="text-3xl sm:text-5xl font-bold font-jakarta">
              <span className="text-[#8371FF]">80,000</span> photos already created for{' '}
              <span className="text-[#01C7E4]">21,000</span>
              <br />happy customers
            </h1>
            
            <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto">
              Not made in a studio. Created by AI. Don't just take our word for it. Our AI turns everyday
              photos into professional headshots, that reflect your confidence & credibility.
            </p>
          </div>
  
          {/* Reviews Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
            {testimonials.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default ReviewSection;