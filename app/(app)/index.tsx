import { Button } from "@/components/ui/button";
import { AuthContext } from "@/lib/auth";
import { useContext } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const authState = useContext(AuthContext)

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-bold">
        Welcome to Nativewind!
      </Text>
      <Button onPress={authState.signOut}><Text>Sign Out</Text></Button>
    </View>
  );
}
