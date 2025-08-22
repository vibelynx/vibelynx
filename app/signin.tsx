import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth";
import { Text, View } from "react-native";

const signIn = async () => {
  const data = await authClient.signIn.social({
    provider: "spotify"
  })

  console.log(data)
}

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="dark:text-white">{process.env.BETTER_AUTH_URL}</Text>
      <Button onPress={() => signIn()}><Text>Sign In</Text></Button>
    </View>
  );
}
