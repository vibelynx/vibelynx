import { AuthContext } from "@/lib/auth";
import { useColorScheme } from "@/lib/useColorScheme";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";

export default function AppLayout() {
  const { isDarkColorScheme } = useColorScheme();
  const authState = useContext(AuthContext)

  if (!authState.session) {
    return <Redirect href="/signin" />
  }

  return (
    <>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  )
}
