import MovieBanner from "@/components/MovieBanner";
import MovieCard from "@/components/MovieCard";
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
  const { data: movies, error } = useFetch(() =>
    fetchMovies({ request: "discover/movie?sort_by=popularity.desc" })
  );

  const { data, loading } = useFetch(() =>
    fetchMovies({ request: "/trending/all/day" })
  );

  return (
    <View className="flex-1 bg-primary">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        {loading ? (
          <ActivityIndicator
            size={"large"}
            color={"#FFC20B"}
            className="mt-10 self-center flex-1"
          />
        ) : error ? (
          <Text className="text-white">{error?.message}</Text>
        ) : (
          <>
            {data && (
              <Carousel
                loop
                autoPlay
                width={screenWidth}
                height={screenHeight / 1.5}
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

            <View className="flex-1 px-5">
              <Text className="text-xl text-action mb-5">Top Rated Movies</Text>

              <FlatList
                data={movies?.slice(0, 9)}
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
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}
