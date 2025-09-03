import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text"
import { Link } from "expo-router";
import { View } from "react-native";

export default function SignIn() {

  return (
    <View className="h-screen mx-10">
      <Text className="text-5xl text-center font-semibold mt-auto mb-20">Share music across
        every platform
      </Text>
      <View className="w-full gap-5 mb-20">
        <Link asChild href="/scope?platform=spotify">
          <Button>
            <Text>
              Continue with Spotify
            </Text>
          </Button>
        </Link>
        <Link asChild href="/scope?platform=appleMusic">
          <Button>
            <Text>
              Continue with Apple Music
            </Text>
          </Button>
        </Link>
      </View>
    </View>
  );
}
