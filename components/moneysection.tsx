import Image from 'next/image';
import moneyone from "/public/moneyone.svg";
import moneytwo from "/public/moneytwo.svg";

const CompositeProfileImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="hidden md:block w-24 sm:w-28 md:w-32 lg:w-40 xl:w-48 transition-all duration-300 ease-in-out">
    <Image 
      src={src} 
      alt={alt} 
      width={192} 
      height={512} 
      className="object-contain w-full h-auto"
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="192" height="512" viewBox="0 0 192 512"><rect width="100%" height="100%" fill="#f3f4f6"/></svg>')}`}
    />
  </div>
);

const MoneyBackGuarantee = () => {
  return (
    <section className="bg-white py-8 sm:py-12 lg:py-16 overflow-hidden rounded-[60px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/4 flex justify-center md:justify-end mb-6 md:mb-0">
            <CompositeProfileImage src={moneyone.src} alt="Left Profiles" />
          </div>
          
          <div className="text-center w-full md:w-1/2 lg:w-2/5 mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 font-['Plus Jakarta Sans']">
              <span className="text-purple-600">Money-</span>
              <span className="text-blue-500">back</span>
            </h2>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4 font-['Plus Jakarta Sans']">Guarantee</h3>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base font-['Poppins']">
              Try Gostudio.ai with confidence. Not completely satisfied? Let us know within 7 days of purchase for a full refund.
            </p>
            <button className="bg-[#5B16FE] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-[#4A12CC] transition duration-300 text-xs sm:text-sm font-['Poppins']">
              Get Started For Free →
            </button>
          </div>
          
          <div className="md:w-1/4 flex justify-center md:justify-start mt-6 md:mt-0">
            <CompositeProfileImage src={moneytwo.src} alt="Right Profiles" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoneyBackGuarantee;