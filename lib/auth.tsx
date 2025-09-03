import { createAuthClient } from "better-auth/react"
import { expoClient } from "@better-auth/expo/client"
import * as SecureStore from "expo-secure-store"
import { createContext, PropsWithChildren, useCallback, useEffect, useState } from "react"
import { useRouter } from "expo-router"
import { Session, User } from "better-auth/types";

type AuthState = {
  // TODO: loading state
  getSession: () => Promise<Session | null>
  session: Session | null
  signIn: (platform: string, scopes: string[]) => Promise<void>
  signOut: () => Promise<void>
  user: User | null
}

export const authClient = createAuthClient({
  baseURL: "https://vibelynx.app",
  plugins: [
    expoClient({
      scheme: "vibelynx",
      storagePrefix: "vibelynx",
      storage: SecureStore,
    })
  ]
})

export const AuthContext = createContext<AuthState>({
  getSession: () => Promise.resolve(null),
  session: null,
  signIn: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
  user: null
})

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const getSession = useCallback(async (): Promise<Session | null> => {
    // Return cached session if still valid
    if (session != null && session.expiresAt > new Date()) {
      return session
    }

    const { data, error } = await authClient.getSession()

    if (error) {
      console.error('Failed to get session:', error.message)
      return null
    }

    if (data?.session?.id) {
      setSession(data.session)
      setUser(data.user)
      return data.session
    }

    return null
  }, [session])

  const signIn = async (platform: string, scopes: string[]) => {
    await authClient.signIn.social({
      provider: platform,
      scopes: scopes,
      callbackURL: "vibelynx://",
    })

    const { data, error } = await authClient.getSession()

    if (error) {
      throw new Error(`Authentication failed: ${error.message}`)
    }

    if (!data?.session?.id) {
      throw new Error('Authentication succeeded but no session was created')
    }

    setSession(data.session)
    setUser(data.user)
    router.replace("/(app)")
  }
  const signOut = async () => {
    await authClient.signOut()
    setSession(null)
    setUser(null)
    router.replace("/signin")
  }

  useEffect(() => {
    const checkSession = async () => {
      const data = await getSession()
      if (data) {
        router.replace("/(app)")
      }
    }
    checkSession()
  }, [getSession, router])

  return (
    <AuthContext value={{ getSession, session, signIn, signOut, user }}>
      {children}
    </AuthContext>
  )
}
