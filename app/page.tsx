import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AIHeadshotsLandingPage from "@/components/Hero";
import ExplainerSection from "@/components/ExplainerSection";
import ComparisonPage from "@/components/Comparison";
import ReviewPage from "@/components/ReviewPage";
import PricingSection from "@/components/PricingSection";
import MoneyBackGuarantee from "@/components/moneysection";
import DataSecuritySection from "@/components/container";
import FAQSection from "@/components/Question";
import HeadshotContainer from "@/components/Banner";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/overview");
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[82px] pt-10">
        <div className="w-full max-w-[1276px] mx-auto space-y-12">
          <AIHeadshotsLandingPage />
          <ExplainerSection />
          <ComparisonPage />
          <ReviewPage />
          <MoneyBackGuarantee />
          <PricingSection user={user} />
          <DataSecuritySection />
          <FAQSection />
          <HeadshotContainer />
         
       
        </div>
      </div>
    </div>
  );
}