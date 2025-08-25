import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const [checked, setChecked] = useState(false);

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-bold">
        Welcome to Nativewind!
      </Text>
      <View>
        <View>
          <View>
            <Text>Spotify Connect</Text>
            <Text>hehe</Text>
          </View>
          <Switch
            checked={checked}
            onCheckedChange={() => setChecked(!checked)}
          />
        </View>
      </View>
    </View>
  );
}
