import { Button } from "@/components/ui/button";
import { AuthContext } from "@/lib/auth";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const authState = useContext(AuthContext)
  const router = useRouter()

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-bold">
        Welcome to Nativewind!
      </Text>
      <Button onPress={() => router.push("/(setup)/permission")}><Text>Track Page</Text></Button>
      <Button onPress={() => router.push(`/(app)/track?id=${"bc0cba17759d905b"}`)}><Text>Track Page</Text></Button>
      <Button onPress={authState.signOut}><Text>Sign Out</Text></Button>
    </View>
  );
}
