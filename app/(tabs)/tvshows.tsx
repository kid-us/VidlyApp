import Card from "@/components/Card";
import GenresList from "@/components/GenreList";
import { allGenres, tvGenres } from "@/constant/genres";
import { fetchMovies } from "@/services/api";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";

const TvShows = () => {
  const [longPressedMovie, setLongPressedMovie] = useState<number | null>(null);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate fetching data from the server
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  }, []);

  const [genre, setGenre] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [tvShows, setTvShows] = useState<Movie[]>([]);

  // Fetching by Genres
  useEffect(() => {
    const fetchTvShowsByGenre = async () => {
      setLoading(true);
      try {
        const request = genre
          ? `/discover/tv?with_genres=${genre}`
          : "/trending/tv/day";
        const data = await fetchMovies({ request });
        setTvShows(data);
      } catch (error) {
        console.error("Error fetching tvShows:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTvShowsByGenre();
  }, [genre]);

  // Getting genre name
  const genreName = (genre: number) => {
    const pick = allGenres.find((g) => g.key === genre);
    return pick ? pick.name : "";
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator
          size={"large"}
          color={"#FFC20B"}
          className="self-center flex-1 bg-primary w-full"
        />
      ) : (
        <View className="flex-1 bg-primary">
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
          >
            {/* TvShows */}
            {genre && loading ? (
              <ActivityIndicator
                size={"large"}
                color={"#FFC20B"}
                className="self-center flex-1 bg-primary w-full"
              />
            ) : (
              <View className="flex-1 px-4">
                {/* Genres List*/}
                <GenresList
                  genre={genre}
                  genresList={tvGenres}
                  setGenre={(genre) => setGenre(genre)}
                />

                <Text className="text-lg font-semibold text-action/80 mb-4">
                  {genre === null ? "Trending" : genreName(genre)} Tv Shows
                </Text>

                <FlatList
                  data={tvShows}
                  renderItem={({ item }) => (
                    <Card
                      {...item}
                      type="tv"
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
                  className="mt-2 mb-8"
                />
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default TvShows;
