import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const Search = () => {
  const [longPressedMovie, setLongPressedMovie] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    data: movies,
    loading,
    error,
    refetch,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await refetch();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

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
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <View className="flex-row w-full justify-center items-center mt-20">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className="my-5">
              <SearchBar
                placeholder="Search movies ..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {loading && (
              <ActivityIndicator
                size={"large"}
                color={"#000ff"}
                className="my-5 self-center"
              />
            )}

            {error && (
              <Text className="text-red-500 px-5 py-3">
                Error: {error.message}
              </Text>
            )}

            {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text className="text-lg text-white mb-5">
                Search Result for :{" "}
                <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 justify-center items-center">
              <Text className="text-center text-gray-500">
                {searchQuery.trim() ? "Movie not found" : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
        className="mt-2 pb-32 px-5"
      />
    </View>
  );
};

export default Search;
