import { default as Card } from "@/components/Card";
import MovieBanner from "@/components/MovieBanner";
import Upcoming from "@/components/Upcoming";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

export default function Home() {
  const [longPressedMovie, setLongPressedMovie] = useState<number | null>(null);
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

  const progress = useSharedValue<number>(0);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate fetching data from the server
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  }, []);

  // Movies
  const { data: movies, error } = useFetch(() =>
    fetchMovies({ request: "discover/movie?sort_by=popularity.desc" })
  );

  // Banner
  const { data, loading } = useFetch(() =>
    fetchMovies({ request: "/trending/all/day" })
  );

  // Upcoming
  const { data: upcoming } = useFetch(() =>
    fetchMovies({ request: "/movie/upcoming" })
  );

  // Popular TV Shows
  const { data: popularTvShows } = useFetch(() =>
    fetchMovies({ request: "/tv/popular" })
  );

  // TV Shows
  const { data: tvShows } = useFetch(() =>
    fetchMovies({ request: "/tv/top_rated" })
  );

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
            {data && data.length > 0 && (
              <View id="carousel-component">
                <Carousel
                  loop
                  autoPlay
                  width={screenWidth}
                  height={screenHeight / 1.4}
                  snapEnabled={true}
                  data={data.filter(
                    (item) => item.backdrop_path && item.poster_path
                  )}
                  autoPlayInterval={10000}
                  style={{ width: "100%" }}
                  mode="parallax"
                  modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 50,
                  }}
                  onProgressChange={progress}
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
              </View>
            )}

            <View className="flex-1 px-4">
              {/* Upcoming Movies */}
              <Text className="text-lg font-semibold text-action/80 mb-4">
                Upcoming Movies
              </Text>

              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-8 mt-3"
                data={upcoming}
                contentContainerStyle={{
                  gap: 10,
                }}
                renderItem={({ item }) => (
                  <Upcoming
                    id={item.id}
                    type="movie"
                    title={item.title}
                    poster={item.poster_path}
                    backdrop_path={item.backdrop_path}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <View className="w-4" />}
              />

              {/* Top Rated Movies */}
              {error ? (
                <Text className="text-white">{error?.message}</Text>
              ) : (
                <>
                  <Text className="text-lg font-semibold text-action/80 mb-5">
                    Top Rated Movies
                  </Text>

                  <FlatList
                    data={movies?.slice(0, 9)}
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
                </>
              )}

              {/* Popular TV Shows */}
              <Text className="text-lg font-semibold text-action/80 mb-4">
                Popular TV Shows
              </Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-8 mt-3"
                data={popularTvShows}
                contentContainerStyle={{
                  gap: 10,
                }}
                renderItem={({ item }) => (
                  <Upcoming
                    id={item.id}
                    type="tv"
                    name={item.name}
                    title={item.title}
                    poster={item.poster_path}
                    backdrop_path={item.backdrop_path}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <View className="w-4" />}
              />
              {/* Top Rated TV Shows */}
              {error ? (
                <Text className="text-white">{error?.message}</Text>
              ) : (
                <>
                  <Text className="text-lg font-semibold text-action/80 mb-5">
                    Top Rated TV Shows
                  </Text>

                  <FlatList
                    data={tvShows?.slice(0, 9)}
                    renderItem={({ item }) => (
                      <Card
                        type="tv"
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
                    className="mt-2 pb-10"
                  />
                </>
              )}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}
