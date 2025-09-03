import { useColorScheme } from "@/lib/useColorScheme";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "@/lib/auth";

export default function AppLayout() {
  const { isDarkColorScheme } = useColorScheme();
  const { session } = useAuth()

  if (!session) {
    return <Redirect href="/signin" />
  }

  return (
    <>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  )
}
