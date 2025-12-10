import { icons } from "@/constants/icons"
import { images } from "@/constants/images"
import { ActivityIndicator, Text, Image, ScrollView, View, FlatList } from "react-native"
import SearchBar from "../components/search-bar"
import { useRouter } from "expo-router"
import { useFetch } from "@/hooks/use-fetch"
import { fetchMovies } from "@/services/api"
import MovieCard from "../components/movie-card"

export default function App() {
  const router = useRouter()

  const { data: movies, loading, error } = useFetch(() => fetchMovies({
    query: 'harry potter'
  }))


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

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
        ) : error ? (
          <Text>Erro ao carregar filmes</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              placeholder="Buscar filmes..."
              onPress={() => router.push("/search")}
            />

            <Text className="text-lg text-white font-bold mt-5 mb-3">Últimos filmes</Text>

            <FlatList
              data={movies}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <MovieCard {...item} />
              )}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: 'flex-start',
                gap: 20,
                paddingRight: 6,
                marginBottom: 10
              }}
              className="mt-2 pb-32"
              scrollEnabled={false}
            />

          </View>
        )}

      </ScrollView>

    </View>
  )
}