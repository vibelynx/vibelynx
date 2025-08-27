import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text"
import { authClient, AuthContext } from "@/lib/auth";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { View } from "react-native";

export default function Index() {
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined)
  const authState = useContext(AuthContext)
  const router = useRouter()

  const getAccessToken = async () => {
    const { data } = await authClient.getAccessToken({
      providerId: "spotify",
    })

    setAccessToken(data?.accessToken)
  }

  useEffect(() => {
    getAccessToken()

    console.log(accessToken)
  }, [])

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-bold">
        Welcome to (app)/index!
      </Text>
      <Button onPress={() => getAccessToken()}><Text>Get Access Token</Text></Button>
      <Button onPress={() => router.push(`/(app)/track?id=${"bc0cba17759d905b"}`)}><Text>Track Page</Text></Button>
      <Button onPress={authState.signOut}><Text>Sign Out</Text></Button>
    </View>
  );
}
