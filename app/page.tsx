import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import HeroSection from "@/components/Hero";
import ExplainerSection from "@/components/ExplainerSection";
import ComparisonPage from "@/components/Comparison";
import ReviewPage from "@/components/ReviewPage";
import PricingSection from "@/components/PricingSection";
import MoneyBackGuarantee from "@/components/moneysection";
import DataSecuritySection from "@/components/container";
import FAQSection from "@/components/Question";
import HeadshotContainer from "@/components/Banner";
import Footer from "@/components/Footer";

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
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <HeroSection />
      <ExplainerSection />
      <ComparisonPage />
      <ReviewPage />
      <PricingSection user={user} />
      <MoneyBackGuarantee />
      <DataSecuritySection />
      <FAQSection />
      <HeadshotContainer />
      <Footer/>
      
    </div>
  );
}