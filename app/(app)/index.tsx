import { XIcon } from 'lucide-react-native';
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text"
import { authClient } from "@/lib/auth";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView, View, StyleSheet, ScrollView, TextInput, Pressable } from "react-native";
import { useColorScheme } from "@/lib/useColorScheme";

export default function Index() {
  const { isDarkColorScheme } = useColorScheme();
  const [showSearch, setShowSearch] = useState<boolean>(false)
  const searchRef = useRef<TextInput>(null);
  const showSearchRef = useRef(false);
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined)

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
      <ScrollView
        onScroll={(event) => {
          if (event.nativeEvent.contentOffset.y < -100 && searchRef.current && !showSearchRef.current) {
            setShowSearch(true)
            searchRef.current.focus()
            setTimeout(() => {
              showSearchRef.current = true
            }, 500)
          } else if (event.nativeEvent.contentOffset.y < -100 && searchRef.current && showSearchRef.current) {
            setShowSearch(false)
            searchRef.current.blur()
            setTimeout(() => {
              showSearchRef.current = false
            }, 500)
          }
        }}
      >
        <View className="h-screen mx-4 mt-2 gap-4">
          {showSearch ? null : <View className="flex-row items-center justify-between">
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
          </View>}
          <Input
            placeholder="Search"
            ref={searchRef} onPress={() => {
              setShowSearch(true)
              showSearchRef.current = true
            }}
          />
          {showSearch ? (
            <ScrollView>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index: number) => (
                <Link key={index} href="/(app)/track?id=bc0cba17759d905b">
                  <View className="w-20 h-20">
                    <Image style={styles.artwork} source="https://i.scdn.co/image/ab67616d0000b273028e0d1464c08f971df5071b" />
                  </View>
                </Link>
              ))}
            </ScrollView>
          ) : (
            <>
              <View className="gap-2">
                <Text variant="large">Recently Played</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((_: any, index: number, array) => (
                    <Link key={index} className={index + 1 < array.length ? "mr-4" : ""} href="/(app)/track?id=bc0cba17759d905b">
                      <View className="w-20 h-20">
                        <Image style={styles.artwork} source="https://i.scdn.co/image/ab67616d0000b273028e0d1464c08f971df5071b" />
                      </View>
                    </Link>
                  ))}
                </ScrollView>
              </View>
            </>
          )
          }
        </View>
      </ScrollView>
    </SafeAreaView>
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
