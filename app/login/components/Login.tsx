"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Database } from '@/types/supabase';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { ArrowRight } from "lucide-react";
import logo from "/public/98.png";
import login from "/public/login.svg";
import { WaitingForMagicLink } from './WaitingForMagicLink';
import { useRouter } from 'next/navigation';

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
      
      if (error) {
        console.error('Supabase sign-in error:', error.message);
        throw error;
      }
  
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
    <div className="flex items-center justify-center h-screen bg-gray-100 p-2">
      <div className="w-full max-w-4xl h-[90vh] mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex">
        {/* Left side with image */}
        <div className="w-1/2 relative hidden lg:block">
          <Image 
            src={login}
            alt="Woman smiling" 
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute bottom-4 left-4 bg-white p-2 rounded-lg shadow-md max-w-[180px]">
            <div className="absolute -bottom-2 -left-2 text-indigo-500 text-xl">★</div>
            <p className="text-sm font-bold mb-1">"Photos came out better than some studios I've tried."</p>
            <p className="text-xs text-indigo-600">— Hanna Su.</p>
          </div>
        </div>
        
        {/* Right side with login form */}
        <div className="w-full lg:w-1/2 p-4 flex flex-col justify-center items-center">
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center mb-4">
              <Image src={logo} alt="Studio.ai logo" width={24} height={24} />
              <span className="font-bold text-sm ml-3">Studio.ai</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mt-4">Log in / Sign up</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[339.5px] space-y-3 mb-4">
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
              className="w-full h-[46px] px-[16.5px] py-[13px] rounded-[50px] border-t border-l-0 border-r-0 border-b-0 border-gray-300 bg-white text-sm"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
            )}
            
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              variant="outline"
              className="w-full h-[46px] px-[16.5px] py-[13px] bg-gray-100 text-gray-700 font-medium rounded-[50px] border-t border-l-0 border-r-0 border-b-0 flex items-center justify-center gap-2 text-xs"
            >
              <FcGoogle size={16} />
              Continue with Google
            </Button>
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-[46px] px-[16.5px] py-[13px] bg-indigo-600 text-white font-medium rounded-[50px] border-t border-l-0 border-r-0 border-b-0 flex items-center justify-center gap-2 text-xs"
            >
              Get code on E-mail
              <ArrowRight className="w-3 h-3" />
            </Button>
          </form>
          
          <div className="text-center mb-4">
            <p className="text-xs text-gray-500">
              Click the button, you will receive a one time code in your inbox.
            </p>
          </div>
          
          <div className="mt-auto">
            <p className="text-[10px] text-center text-gray-500 leading-tight max-w-[339.5px]">
              By signing up, you accept our{' '}
              <a href="#" className="text-indigo-600">Terms & Conditions</a>{' '}
              and{' '}
              <a href="#" className="text-indigo-600">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;