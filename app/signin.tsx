import { Button } from "@/components/ui/button";
import { AuthContext } from "@/lib/auth";
import { useContext } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const authState = useContext(AuthContext)

  return (
    <View className="h-screen mx-10">
      <Text className="dark:text-white text-5xl text-center font-semibold mt-auto mb-20">Share music across
        every platform
      </Text>
      <View className="w-full gap-5 mb-20">
        <Button className="w-full" onPress={authState.signIn}><Text>Continue with Email</Text></Button>
        <Button className="w-full" onPress={authState.signIn}><Text>Continue with Apple</Text></Button>
        <Button className="w-full" onPress={authState.signIn}><Text>Continue with Spotify</Text></Button>
      </View>
    </View>
  );
}
