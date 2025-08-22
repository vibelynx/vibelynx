import { Button } from "@/components/ui/button";
import { AuthContext } from "@/lib/auth";
import { useContext } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const authState = useContext(AuthContext)

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Sign In Page</Text>
      <Button onPress={authState.signIn}><Text>Sign In</Text></Button>
    </View>
  );
}
