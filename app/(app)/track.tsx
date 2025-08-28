import { Text, StyleSheet, View, SafeAreaView } from "react-native"
import { Image } from 'expo-image'
import { useLocalSearchParams, Link } from "expo-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { GetTrack, Track } from "@vibelynx/vibelynx-js"

export default function TrackScreen() {
  const { id, url } = useLocalSearchParams<{ id?: string; url?: string }>();
  const [track, setTrack] = useState<any>(null)

  useEffect(() => {
    if (id) {
      GetTrack(id)
        .then((data: { track: Track, error: Error | null }) => setTrack(data.track))
    }
  }, [id])

  return (
    <SafeAreaView>
      <View className="h-screen mx-10 mt-10 gap-10">
        <View className="gap-5">
          <View className="w-80 h-80 mx-auto">
            <Image
              style={styles.artwork}
              source={track?.artwork}
              contentFit="cover"
            />
          </View>
          <View className="gap-2.5">
            <Text className="dark:text-white text-2xl text-center font-semibold">
              {track?.title}
            </Text>
            <View className="flex flex-row gap-2 w-fit mx-auto">
              {track?.artists.map((artist: any) => (
                <Text key={artist.id} className="dark:text-white text-lg font-medium text-center">
                  {artist.name}
                </Text>
              ))}
            </View>
            <Button onPress={() => { }}><Text>Play</Text></Button>
          </View>
        </View>
        <View className="gap-5">
          <Text className="dark:text-white text-lg font-medium">Open In</Text>
          <View className="flex flex-row gap-5">
            {track?.platforms.map((platform: any) => (
              <Link href={platform.url} key={platform.key} className="w-20 h-20">
                <Image
                  style={styles.image}
                  source={`https://vibelynx.app/${platform.key}.svg`}
                  contentFit="cover"
                />
              </Link>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  artwork: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 25
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 0
  },
});

