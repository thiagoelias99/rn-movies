import "../global.css"

import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import * as NavigationBar from 'expo-navigation-bar'
import { useEffect } from "react"

export default function Layout() {

  useEffect(() => {
    NavigationBar.setButtonStyleAsync('light')
    NavigationBar.setStyle('light')
  }, [])

  return (
    <>
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
    </>
  )
}