import { useColorScheme } from "@/lib/useColorScheme";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

const isSignedIn = false

export default function RootLayout() {
  const { isDarkColorScheme } = useColorScheme();

  if (!isSignedIn) {
    return <Redirect href="/signin" />
  }

  return (
    <>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
      <Stack />
    </>
  )
}
