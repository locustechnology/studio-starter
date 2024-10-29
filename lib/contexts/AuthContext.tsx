'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

interface AuthContextType {
  user: User | null
  credits: number | null
  loading: boolean
  signOut: () => Promise<void>
  refreshCredits: () => Promise<void>
  signInWithEmail: (email: string) => Promise<{ error: Error | null }>
  signInWithGoogle: () => Promise<{ error: Error | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [credits, setCredits] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()

  const refreshCredits = async () => {
    if (!user) return
    const { data, error } = await supabase
      .from('credits')
      .select('credits')
      .eq('user_id', user.id)
      .single()
    
    if (!error) {
      setCredits(data?.credits ?? 0)
    }
  }

  const signInWithEmail = async (email: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      return { error }
    } catch (error) {
      return { error: error as Error }
    }
  }

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      return { error }
    } catch (error) {
      return { error: error as Error }
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  useEffect(() => {
    const initializeAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) await refreshCredits()
      setLoading(false)
    }

    initializeAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          await refreshCredits()
        } else {
          setCredits(null)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ 
      user, 
      credits, 
      loading, 
      signOut, 
      refreshCredits,
      signInWithEmail,
      signInWithGoogle
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 