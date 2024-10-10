'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Database } from '@/types/supabase';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SubmitHandler, useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import logo from "/public/98.png";
import login from "/public/login.svg";
import { WaitingForMagicLink } from './WaitingForMagicLink';
import { useRouter } from 'next/navigation';
import final_Logo from "/public/final_Logo.svg";

type Inputs = {
  email: string;
};

const LoginPage: React.FC = () => {
  const supabase = createClientComponentClient<Database>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWaiting, setShowWaiting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: data.email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) throw error;
  
      setShowWaiting(true);
      toast({
        title: "Email sent",
        description: "Check your inbox for a magic link to sign in.",
        duration: 5000,
      });
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: "Invalid Email Address",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error('Google sign-in error:', error);
      toast({
        title: "Google sign-in failed",
        variant: "destructive",
        description: "Please try again. If the problem persists, contact support.",
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/dashboard');
      }
    };

    checkSession();
  }, [router, supabase.auth]);

  if (showWaiting) {
    return <WaitingForMagicLink toggleState={() => setShowWaiting(false)} />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-poppins">
      <div className="w-full max-w-4xl h-screen lg:h-[90vh] bg-white rounded-none lg:rounded-xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
        <div className="lg:w-1/2 relative hidden lg:block">
          <Image 
            src={login}
            alt="Woman smiling" 
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md max-w-[220px]">
            <div className="absolute -bottom-2 -left-2 text-indigo-500 text-xl">★</div>
            <p className="text-sm font-bold mb-1 font-jakarta">"Photos came out better than some studios I've tried."</p>
            <p className="text-xs text-indigo-600">— Hanna Su.</p>
          </div>
        </div>
        
        <div className="lg:w-1/2 p-8 flex flex-col justify-between h-full">
          <div>
            <div className="flex flex-col items-center mb-8">
              <div className="flex items-center mb-4">
              <Image src={final_Logo} alt="Studio.ai logo"  className="rounded-sm" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mt-4 font-jakarta">Log in / Sign up</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 font-jakarta">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@mybiz.com"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className="w-[339.5px] h-[46px] px-[17px] py-[13px] rounded-[50px] border-t border-l focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                )}
              </div>
              
              <Button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-[339.5px] h-[46px] px-[16.5px] py-[13px] bg-[#5B16FE] text-white font-medium rounded-[50px] border-t border-l hover:bg-[#4A12CC] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5B16FE] flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z" fill="#3F83F8"/>
                  <path d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z" fill="#34A853"/>
                  <path d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z" fill="#FBBC04"/>
                  <path d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </Button>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="outline"
                className="w-[339.5px] h-[46px] px-[16.5px] py-[13px] bg-white text-gray-700 font-medium rounded-[50px] border-t border-l hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center"
              >
                Get code on E-mail
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </form>
            
            <div className="text-center mt-6">
              <p className="w-[314.95px] h-[34px] text-xs text-gray-500 font-poppins font-normal leading-[18px] mx-auto">
                Click the button, you will receive a one time code in<br />your inbox.
              </p>
            </div>
          </div>
          
          <div className="mt-auto">
            <p className="text-xs text-center text-gray-500">
              By signing up, you accept our{' '}
              <a href="#" className="text-indigo-600 hover:underline">Terms & Conditions</a>{' '}
              and{' '}
              <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;