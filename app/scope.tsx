import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { AuthContext } from "@/lib/auth";
import { useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

type Scopes = {
  label: string
  description: string
  values: Scope[]
}

type Scope = {
  label: string
  description: string
  value: string
}

const scopes: Scopes[] = [
  {
    label: "Playback",
    description: "Manage your Playback State",
    values: [
      {
        label: "Read Playback State",
        description: "Read your currently playing content and Spotify Connect devices information.",
        value: "user-read-playback-state"
      },
      {
        label: "Control Playback State",
        description: "Control playback on your Spotify clients and Spotify Connect devices.",
        value: "user-modify-playback-state"
      },
      {
        label: "Read Current Playback State",
        description: "Read access to a user’s currently playing content.",
        value: "user-read-currently-playing"
      },
    ]
  },
  {
    label: "Playlists",
    description: "Manage your public and Private Playlists.",
    values: [
      {
        label: "Read Private Playlists",
        description: "Access your private playlists.",
        value: "playlist-read-private"
      },
      {
        label: "Read Collaborative Playlists",
        description: "Access your collaborative playlists.",
        value: "playlist-read-collaborative"
      },
      {
        label: "Modify Private Playlists",
        description: "Manage your private playlists.",
        value: "playlist-modify-private"
      },
      {
        label: "Modify Public Playlists",
        description: "Manage your public playlists.",
        value: "playlist-modify-public"
      }
    ]
  },
  {
    label: "Followers",
    description: "Manage your Followers.",
    values: [
      {
        label: "Modify Followers",
        description: "Manage who you are following.",
        value: "user-follow-modify"
      },
      {
        label: "Read Followers",
        description: "Access your followers and who you are following.",
        value: "user-follow-read"
      }
    ]
  },
  {
    label: "Listening History",
    description: "Read your listening history.",
    values: [
      {
        label: "Read user top",
        description: "Read your top artists and content.",
        value: "user-top-read"
      },
      {
        label: "Read recently items",
        description: "Access your recently played items.",
        value: "user-read-recently-played"
      }
    ]
  },
  {
    label: "Library",
    description: "Manage your Library.",
    values: [
      {
        label: "Manage Library",
        description: "Manage your saved content.",
        value: "user-library-modify"
      },
      {
        label: "Read Library",
        description: "Access your saved content.",
        value: "user-library-read"
      }
    ]
  },
]

export default function Scope() {
  const { platform } = useLocalSearchParams<{ platform: string }>()
  const [selectedScopes, setSelectedScopes] = useState<Set<string>>(new Set())
  const authState = useContext(AuthContext)

  const toggleScope = (scopeValue: string) => {
    const newSelectedScopes = new Set(selectedScopes);
    if (newSelectedScopes.has(scopeValue)) {
      newSelectedScopes.delete(scopeValue);
    } else {
      newSelectedScopes.add(scopeValue);
    }
    setSelectedScopes(newSelectedScopes);
  };

  const isScopeSelected = (scopeValue: string) => {
    return selectedScopes.has(scopeValue);
  };

  useEffect(() => {
    const allScopeValues = scopes.flatMap((scope: Scopes) =>
      scope.values.map((value: Scope) => value.value)
    );
    setSelectedScopes(new Set(allScopeValues));
  }, [])

  return (
    <SafeAreaView className="relative h-screen">
      <ScrollView>
        <View className="flex-1 items-center justify-center mx-6 gap-6 py-6">
          <Text variant="h1">
            Setup{" "}
            {{
              spotify: "Spotify",
              appleMusic: "Apple Music"
            }[platform]}
          </Text>
          <Accordion type="multiple" collapsable className="w-full">
            {scopes.map((scope: Scopes) => (
              <AccordionItem key={scope.label} value={scope.label}>
                <AccordionTrigger className="flex-row items-center justify-between w-full">
                  <View>
                    <Text className="text-xl font-medium">{scope.label}</Text>
                    <Text className="text-muted-foreground">{scope.description}</Text>
                  </View>
                  <Switch
                    checked={scope.values.every((value: Scope) => isScopeSelected(value.value))}
                    onCheckedChange={() => {
                      const allSelected = scope.values.every((value: Scope) => isScopeSelected(value.value));
                      const newSelectedScopes = new Set(selectedScopes);

                      if (allSelected) {
                        // Uncheck all scopes in this category
                        scope.values.forEach((value: Scope) => {
                          newSelectedScopes.delete(value.value);
                        });
                      } else {
                        // Check all scopes in this category
                        scope.values.forEach((value: Scope) => {
                          newSelectedScopes.add(value.value);
                        });
                      }
                      setSelectedScopes(newSelectedScopes);
                    }}
                  />
                </AccordionTrigger>
                <AccordionContent className="ml-3 gap-4">
                  {scope.values.map((value: Scope) => (
                    <View key={value.label} className="flex-row items-center justify-between w-full">
                      <View className="max-w-xs">
                        <Text className="text-lg font-medium">{value.label}</Text>
                        <Text className="text-sm text-muted-foreground">{value.description}</Text>
                      </View>
                      <Switch
                        checked={isScopeSelected(value.value)}
                        onCheckedChange={() => toggleScope(value.value)}
                      />
                    </View>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </View>
      </ScrollView>
      <Button
        className="absolute bottom-12 w-full"
        onPress={() => authState.signIn(platform, Array.from(selectedScopes))}
      >
        <Text>Connect</Text>
      </Button>
    </SafeAreaView>
  );
}
