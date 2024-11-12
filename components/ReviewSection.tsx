import React from 'react';
import Image from 'next/image';
import AI  from "@/public/logo/AI.svg"



  // First, let's define the type for our testimonial
  interface Testimonial {
    image?: string;
    rating: number;
    text: string;
  }



const testimonials: Testimonial[] = [
  {
    image: '/reviews/juice.png',
    rating: 5,
    text: 'Took photos with my iPhone, uploaded them and wow! The lighting looks so professional. Saved me hundreds on product photography for my new juice line 📸'
  },
  {
    image: '/reviews/sunscreen.jpeg',
    rating: 5,
    text: '¡Increíble servicio! Mis productos de skincare se ven súper profesionales. Perfecto para mi tienda Shopify 🌟' // Spanish: "Amazing service! My skincare products look super professional. Perfect for my Shopify store"
  },
  {
    text: 'Been selling handmade jewelry for 3 years, always struggled with photos. Found this last month and honestly cant believe how much time & money Im saving. My Etsy sales are up 40% since updating product pics!',
    rating: 5
  },
  {
    image: '/reviews/seed.jpeg',
    rating: 5,
    text: 'すごく便利です！商品写真の品質が劇的に良くなって、Amazonでの売上が上がりました。時間も節約できて助かります。' // Japanese: "So convenient! Product photo quality improved dramatically, increased our Amazon sales. Really helps save time."
  },
  {
    text: 'Started using this for my vintage shop last week. The lighting and shadows look completely natural - my customers keep asking which photography studio I use 😅 Not telling them its all done from my phone!',
    rating: 5
  },
  {
    image: '/reviews/bottle.png',
    rating: 5,
    text: 'Finally found a solution for my small business that doesnt break the bank. Used to spend $200/product for professional shots, this is a game changer 🙌'
  },
  {
    image: '/reviews/oil.png',
    rating: 5,
    text: 'Photographed 30 essential oils in different settings within an hour. Studio quoted me $1500 and 2 weeks for the same job. No brainer really!'
  },
  {
    text: 'Running a small cosmetics brand is tough - marketing costs eat up all profits. This tool changed everything. Shot entire product line in one afternoon, got tons of options for social media. Photos look better than competitors who spend thousands on professional shoots.',
    rating: 5
  },
  {
    image: '/reviews/skincare.png',
    rating: 5,
    text: 'Tried everything for my skincare line - lightbox, ring lights, pro photographer. Nothing came close to these results. Plus the time saved on editing is massive.'
  },
  {
    image: '/reviews/perfume.png',
    rating: 5,
    text: 'Incroyable ! Mes photos de parfums sont maintenant au niveau des grandes marques. Rapport qualité-prix imbattable 💫' // French: "Incredible! My perfume photos are now on par with big brands. Unbeatable value for money"
  },
  {
    image: '/reviews/drink.png',
    rating: 5,
    text: 'Shot my entire beverage line in one go. The reflections and lighting on the bottles look totally pro. Already got questions from stockists about our "new photographer" 😂'
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
      <div className="break-inside-avoid mb-6 rounded-[20px] border border-[rgba(10,23,39,0.1)] overflow-hidden bg-white">
        {review.image ? (
          <div className="relative aspect-square w-full">
            <Image
              src={review.image}
              alt="Review image"
              layout="fill"
              objectFit="cover"
            />
            {/* <div className="absolute top-4 left-4 bg-white rounded-full px-3 py-1.5 text-sm flex items-center gap-2 shadow-sm">
              <div className="w-1.5 h-1.5 bg-[#2B87FF] rounded-full"></div>
              <span className="text-[13px] font-medium">GoStudio.ai</span>
            </div> */}
            <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
      <Image src={AI} alt="AI Logo" width={60} height={16} className="w-[60px] h-[16px] sm:w-[90px] sm:h-[25px]" />
    </div>
          </div>
        ) : null}
        
        <div className="p-4 space-y-2">
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
              <span className="bg-gradient-to-r from-[#7160FF] to-[#B19FFF] text-transparent bg-clip-text">80000</span> Photos already created
              <br/>
              <span className="bg-gradient-to-r from-[#00B6D0] to-[#53E0FF] text-transparent bg-clip-text">21000</span> Happy customers 
            </h1>
            
            <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto">
              Not made in a studio. Created by AI. Don't just take our word for it. Our AI turns everyday
              photos into professional headshots, that reflect your confidence & credibility.
            </p>
          </div>
  
          {/* Reviews Grid - using columns-3 for masonry layout */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
            {testimonials.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default ReviewSection;