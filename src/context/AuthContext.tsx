import type { User } from "@supabase/supabase-js"
import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../supabase-client"


interface AuthContextType {
  user: User | null
  signInWithGit: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const signInWithGit = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: window.location.origin,
      },
    })

    if (error) {
      console.error(error.message)
    }
  }


  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
  
    if (error) {
      console.error(error.message)
      return
    }
  
    window.location.replace("/")
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGit, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within the AuthProvider")
  }

  return context
}