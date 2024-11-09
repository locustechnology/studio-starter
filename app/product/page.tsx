import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


import AIHeadshotsLandingPage from "@/components/Hero";
import AIToolSection from "@/components/AIToolSection";
import AIBackgroundSection from '@/components/AIBackgroundSection';
import ComparisonPage from "@/components/Comparison";
import ReviewSection from "@/components/ReviewSection";
import PricingSection from "@/components/PricingSection";
import MoneyBackGuarantee from "@/components/moneysection";
import DataSecuritySection from "@/components/container";
import FAQSection from "@/components/Question";
import HeadshotContainer from "@/components/Banner";

export const dynamic = "force-dynamic";

export default async function RealtorPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/overview");
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[82px]">
        <div className="w-full max-w-[1276px] mx-auto space-y-12">
          
          
          
        <div id="ai-headshots">
          <AIHeadshotsLandingPage />
          </div>
          <AIToolSection />
          <AIBackgroundSection />
          <ComparisonPage />
          <div id="testimonial">
          <ReviewSection />
          </div>
          {/* <MoneyBackGuarantee /> */}
          <div id="pricing">
            <PricingSection user={user} />
          </div>
          <DataSecuritySection />
          <div id="faq">
            <FAQSection />
          </div>
          <HeadshotContainer />
        </div>
      </div>
    </div>
  );
} 