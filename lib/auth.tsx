import { createAuthClient } from "better-auth/react"
import { expoClient } from "@better-auth/expo/client"
import * as SecureStore from "expo-secure-store"
import { createContext, PropsWithChildren, useEffect, useState } from "react"
import { useRouter } from "expo-router"

type AuthState = {
  isSignedIn: boolean
  signIn: (platform: string, scopes: string[]) => void
  signOut: () => void
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
  isSignedIn: false,
  signIn: () => { },
  signOut: () => { }
})

export function AuthProvider({ children }: PropsWithChildren) {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const router = useRouter()

  const checkSession = async () => {
    const { data } = await authClient.getSession()

    if (!!data?.session.id) {
      setIsSignedIn(true)
      router.replace("/(app)")
    }
  }

  useEffect(() => {
    checkSession()
  }, [])

  const signIn = async (platform: string, scopes: string[]) => {
    await authClient.signIn.social({
      provider: platform,
      scopes: scopes,
      callbackURL: "vibelynx://",
    })

    const { data } = await authClient.getSession()

    if (!!data?.session.id) {
      setIsSignedIn(true)
      router.replace("/(app)")
    } else {
      console.log("error")
    }
  }
  const signOut = async () => {
    await authClient.signOut()
    setIsSignedIn(false)
    router.replace("/signin")
  }

  return (
    <AuthContext value={{ isSignedIn, signIn, signOut }}>
      {children}
    </AuthContext>
  )
}
