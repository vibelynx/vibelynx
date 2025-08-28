import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text"
import { authClient, AuthContext } from "@/lib/auth";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, ScrollView } from "react-native";

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
    <SafeAreaView>
      <View className="h-screen mx-4 mt-2 gap-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <View className="w-10 h-10">
              <Image style={styles.image} source="https://vibelynx.app/spotify.svg" />
            </View>
            <Text variant="large">Isaiah Hamilton</Text>
          </View>
          <View className="flex-row items-center gap-4">
            <View className="w-10 h-10">
              <Image style={styles.image} source="https://vibelynx.app/spotify.svg" />
            </View>
            <View className="w-10 h-10">
              <Image style={styles.image} source="https://vibelynx.app/spotify.svg" />
            </View>
            <View className="w-10 h-10">
              <Image style={styles.image} source="https://vibelynx.app/spotify.svg" />
            </View>
          </View>
        </View>
        <Input placeholder="Search" />
        <View className="gap-2">
          <Text variant="large">Recently Played</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => (
              <Link href="/(app)/track?id=bc0cba17759d905b">
                <View className="w-20 h-20">
                  <Image style={styles.artwork} source="https://i.scdn.co/image/ab67616d0000b273028e0d1464c08f971df5071b" />
                </View>
              </Link>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  artwork: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 15
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 0
  },
});
