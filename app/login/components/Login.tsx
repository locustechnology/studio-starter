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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-xl" style={{ height: '90vh' }}>
        {/* Left side with image */}
        <div className="w-1/2 relative">
          <Image src={login} alt="Login page image" layout="fill" objectFit="cover" />
          <div className="absolute bottom-8 left-8 bg-white p-4 rounded-xl shadow-lg max-w-xs">
            <div className="absolute -top-3 -left-3 text-blue-500 text-3xl">★</div>
            <p className="text-lg font-bold mb-1">"Photos came out better than some studios I've tried."</p>
            <p className="text-purple-600">— Hanna Su.</p>
          </div>
        </div>
        
        {/* Right side with login form */}
        <div className="w-1/2 p-10 flex flex-col">
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <Image src={logo} alt="Studio.ai logo" width={28} height={28} />
              <span className="font-bold text-xl ml-2">Studio.ai</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Log in / Sign up</h2>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg text-lg"
            >
              Get code on E-mail →
            </Button>
          </form>
          
          <div className="mt-6">
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              variant="outline"
              className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 text-lg"
            >
              <FcGoogle size={20} />
              Continue with Google
            </Button>
          </div>
          
          <p className="mt-6 text-sm text-center text-gray-500">
            Click the button, you will receive a one time code in your inbox.
          </p>
          
          <p className="mt-auto text-xs text-center text-gray-500">
            By signing up, you accept our{' '}
            <a href="#" className="text-purple-600 hover:text-purple-500">
              Terms & Conditions
            </a>{' '}
            and{' '}
            <a href="#" className="text-purple-600 hover:text-purple-500">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;