import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text"
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView, View, StyleSheet, ScrollView, TextInput, FlatList, TouchableOpacity } from "react-native";
import { GetUserHistory, History } from "@vibelynx/vibelynx-js"
import { useAuth } from "@/lib/auth";

export default function Index() {
  const [showSearch, setShowSearch] = useState<boolean>(false)
  const searchRef = useRef<TextInput>(null);
  const showSearchRef = useRef(false);
  const { session, user } = useAuth()
  const [history, setHistory] = useState<History[] | null>(null)

  useEffect(() => {
    if (session && user) {
      GetUserHistory(user.id, session?.token)
        .then((data: { history: History[], error: Error | null }) => setHistory(data.history))
    }
  }, [])

  console.log(history)

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
            <View className="gap-2">
              <Text variant="large">Recently Played</Text>
              <FlatList
                className="gap-4"
                horizontal
                data={history ?? []}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => router.push(`/(app)/track?id=${item.id}`)}
                    className={`flex-1 gap-2 max-w-40 ${history && index < history.length - 1 ? "mr-4" : ""}`}
                  >
                    <View className="w-40 h-40">
                      <Image style={styles.artwork} source={item.artwork} />
                    </View>
                    <Text numberOfLines={1} variant="small">
                      {item.type} - {item.title}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
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
