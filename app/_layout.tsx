import NetworkError from "@/components/NetworkError";
import { useNetInfo } from "@react-native-community/netinfo";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import "./global.css";

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const { isInternetReachable } = useNetInfo();

  return (
    <SafeAreaView style={{ paddingTop: insets.top }} className="flex-1">
      <StatusBar backgroundColor="#000" />
      {!isInternetReachable ? (
        <NetworkError insets={insets} />
      ) : (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="tvshows/[id]" options={{ headerShown: false }} />
        </Stack>
      )}
    </SafeAreaView>
  );
}
