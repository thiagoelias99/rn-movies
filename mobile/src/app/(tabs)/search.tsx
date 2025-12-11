import { View, Text, Image, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from "@/constants/images"
import { icons } from "@/constants/icons"
import { useRouter } from "expo-router"
import { useFetch } from "@/hooks/use-fetch"
import { fetchMovies } from "@/services/api"
import MovieCard from "../components/movie-card"
import SearchBar from "../components/search-bar"

export default function Search() {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const router = useRouter()

  const { data: movies, loading, error, refetch, reset } = useFetch(() => fetchMovies({
    query: searchQuery,
  }), false)

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await refetch()

        // Call updateSearchCount only if there are results
        if (movies?.length! > 0 && movies?.[0]) {
          // await updateSearchCount(searchQuery, movies[0])
        }
      } else {
        reset()
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  return (
    <View className="flex-1 bg-primary">
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
          ListHeaderComponent={
            <View className="my-5">
              <SearchBar
                placeholder="Buscar filmes..."
                onPress={() => router.push("/search")}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <Text className="text-lg text-white font-bold mt-5 mb-3">Resultados da busca por {" "}<Text className="text-accent">{searchQuery}</Text></Text>
            </View>
          }
          ListEmptyComponent={
            !loading && !error ? (
              <View className="mt-10 px-5">
                <Text className="text-center text-gray-500">
                  {searchQuery.trim()
                    ? "Sem resultados encontrados"
                    : "Comece a digitar para buscar filmes"}
                </Text>
              </View>
            ) : null
          }
        />
      </ScrollView>
    </View>
  )
}
