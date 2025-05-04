import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();
  const [longPressedMovie, setLongPressedMovie] = useState<number | null>(null);

  const {
    data: movies,
    loading,
    error,
  } = useFetch(() =>
    fetchMovies({ request: "discover/movie?sort_by=popularity.desc" })
  );

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {loading ? (
          <ActivityIndicator
            size={"large"}
            color={"#000ff"}
            className="mt-10 self-center"
          />
        ) : error ? (
          <Text className="text-white">{error?.message}</Text>
        ) : (
          <View>
            {/* Search Bar */}
            <View>
              <SearchBar
                onPress={() => router.push("/search")}
                placeholder="Search for a movie"
              />

              <>
                <Text className="text-2xl text-white my-5">
                  Top Rated Movies
                </Text>

                <FlatList
                  data={movies}
                  renderItem={({ item }) => (
                    <MovieCard
                      {...item}
                      longPressedMovie={longPressedMovie}
                      setLongPressedMovie={setLongPressedMovie}
                    />
                  )}
                  numColumns={3}
                  columnWrapperStyle={{
                    justifyContent: "flex-start",
                    gap: 10,
                    paddingRight: 5,
                    marginBottom: 10,
                  }}
                  ItemSeparatorComponent={() => <View className="my-2" />}
                  keyExtractor={(item) => item.id.toFixed(1)}
                  scrollEnabled={false}
                  className="mt-2 pb-32"
                />
              </>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
