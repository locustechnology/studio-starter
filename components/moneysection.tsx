import Image from 'next/image';
import moneyone from "/public/moneyone.svg";
import moneytwo from "/public/moneytwo.svg";

const CompositeProfileImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="hidden md:block w-[186px] h-[495px] rounded-[10px] overflow-hidden">
    <Image 
      src={src} 
      alt={alt} 
      width={186} 
      height={495} 
      className="object-cover w-full h-full"
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="186" height="495" viewBox="0 0 186 495"><rect width="100%" height="100%" fill="#f3f4f6"/></svg>')}`}
    />
  </div>
);

const MoneyBackGuarantee = () => {
  return (
    <section className="w-full max-w-[1276px] mx-auto p-4 font-poppins">
      <div className="flex flex-col gap-[10px]">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/4 flex justify-center md:justify-end mb-4 md:mb-0">
            <CompositeProfileImage src={moneyone.src} alt="Left Profiles" />
          </div>
          
          <div className="text-center w-full md:w-1/2 lg:w-2/5 mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 font-jakarta">
              <span className="text-purple-600" style={{ background: 'linear-gradient(90deg, #8371FF -39.48%, #A077FE 15.54%, #01C7E4 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Money-</span>
              <span className="text-blue-500" style={{ background: 'linear-gradient(90deg, #8371FF -39.48%, #A077FE 15.54%, #01C7E4 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>back</span>
            </h2>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4 font-jakarta">Guarantee</h3>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
              Try Gostud.io with confidence. Not completely satisfied? Let us know within 7 days of purchase for a full refund.
            </p>
            <div className="flex justify-center">
              <button className="bg-[#5B16FE] text-white w-full sm:w-[287px] h-[48px] rounded-[50px] px-[25px] py-[12px] font-semibold hover:bg-[#5B16FE] transition duration-300 text-sm sm:text-base flex items-center justify-center gap-[10px]">
                <span>Get Started For Free</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="md:w-1/4 flex justify-center md:justify-start mt-4 md:mt-0">
            <CompositeProfileImage src={moneytwo.src} alt="Right Profiles" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoneyBackGuarantee;