import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { SafeAreaView } from "react-native-safe-area-context"
import "../global.css"

export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent style="light" backgroundColor="#000" />
      <Stack>
        <Stack.Screen name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="movies/[id]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </SafeAreaView>
  )
}