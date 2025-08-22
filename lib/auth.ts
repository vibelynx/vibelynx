import { createAuthClient } from "better-auth/react"
import { expoClient } from "@better-auth/expo/client"
import * as SecureStore from "expo-secure-store"

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
