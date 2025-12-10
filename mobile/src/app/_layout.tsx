import { Stack } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import "../global.css"

export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="movie/[id]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </SafeAreaView>
  )
}