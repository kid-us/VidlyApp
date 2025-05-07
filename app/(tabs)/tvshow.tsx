import Card from "@/components/Card";
import GenresList from "@/components/GenresList";
import MovieBanner from "@/components/MovieBanner";
import { allGenres, tvGenres } from "@/constants/genres";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

const TvShow = () => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
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
  const { data, loading: bannerLoading } = useFetch(() =>
    fetchMovies({ request: "/tv/popular" })
  );

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
      {bannerLoading ? (
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
            {data && (
              <Carousel
                loop
                autoPlay
                width={screenWidth}
                height={screenHeight / 1.3}
                snapEnabled={true}
                data={data.filter(
                  (item) => item.backdrop_path && item.poster_path
                )}
                autoPlayInterval={10000}
                style={{ width: "100%" }}
                renderItem={({ item }) => (
                  <MovieBanner
                    key={item.id}
                    overview={item.overview}
                    poster_path={item.poster_path}
                    title={item.title}
                    backdrop_path={item.backdrop_path}
                    name={item.name}
                  />
                )}
              />
            )}

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

export default TvShow;
