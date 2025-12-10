import { icons } from "@/constants/icons"
import { images } from "@/constants/images"
import { Image, ScrollView, View } from "react-native"
import SearchBar from "../components/search-bar"
import { useRouter } from "expo-router"

export default function App() {
  const router = useRouter()

  return (
    <View
      className="flex-1 bg-primary"
    >
      <Image
        source={images.bg}
        className="absolute w-full z-0"
      />

      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 8,
          flexGrow: 1,
        }}
      >
        <Image source={icons.logo}
          className="w-12 h-10 mt-20 mb-5 mx-auto"
        />

        <SearchBar
          placeholder="Buscar filmes..."
          onPress={() => router.push("/search")}
        />

      </ScrollView>

    </View>
  )
}