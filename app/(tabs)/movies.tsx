import Card from "@/components/Card";
import GenresList from "@/components/GenreList";
import { allGenres, movieGenres } from "@/constant/genres";
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

const Movie = () => {
  // const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

  const [longPressedMovie, setLongPressedMovie] = useState<number | null>(null);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate fetching data from the server
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  }, []);

  // Banner
  // const { data, loading: bannerLoading } = useFetch(() =>
  //   fetchMovies({ request: "/movie/upcoming" })
  // );

  const [genre, setGenre] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<Movie[]>([]);

  // Fetching by Genres
  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      setLoading(true);
      try {
        const request = genre
          ? `/discover/movie?with_genres=${genre}`
          : "/trending/movie/day";
        const data = await fetchMovies({ request });
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesByGenre();
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
            {/* Movies */}
            <View className="flex-1 px-4">
              {/* Genres List*/}
              <GenresList
                genre={genre}
                genresList={movieGenres}
                setGenre={(genre) => setGenre(genre)}
              />

              <Text className="text-lg font-semibold text-action/80 mb-4">
                {genre === null ? "Trending" : genreName(genre)} Movies
              </Text>

              <FlatList
                data={movies}
                renderItem={({ item }) => (
                  <Card
                    {...item}
                    type="movie"
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
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default Movie;
