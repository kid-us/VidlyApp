import { default as Card } from "@/components/Card";
import MovieBanner from "@/components/MovieBanner";
import Upcoming from "@/components/Upcoming";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  Text,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

export default function Index() {
  const [longPressedMovie, setLongPressedMovie] = useState<number | null>(null);
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

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
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
          >
            {/* <Image
              source={logo}
              className="absolute top-0 z-50 size-14 ms-5 mt-5"
            /> */}
            {data && (
              <Carousel
                loop
                autoPlay
                width={screenWidth}
                height={screenHeight / 1.7}
                snapEnabled={true}
                data={data}
                autoPlayInterval={10000}
                style={{ width: "100%" }}
                renderItem={({ item }) => (
                  <MovieBanner
                    key={item.id}
                    overview={item.overview}
                    poster_path={item.poster_path}
                    id={item.id}
                    title={item.title}
                    backdrop_path={item.backdrop_path}
                    name={item.name}
                  />
                )}
              />
            )}

            <View className="flex-1 px-4">
              {/* Upcoming Movies */}
              <Text className="text-lg font-semibold text-action mb-4">
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
                  <Text className="text-lg font-semibold text-action mb-5">
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
              <Text className="text-lg font-semibold text-action mb-4">
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
                  <Text className="text-lg font-semibold text-action mb-5">
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
                    className="mt-2 pb-32"
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
