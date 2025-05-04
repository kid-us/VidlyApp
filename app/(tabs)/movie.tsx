import Card from "@/components/Card";
import MovieBanner from "@/components/MovieBanner";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  Text,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

const Movie = () => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

  const [longPressedMovie, setLongPressedMovie] = useState<number | null>(null);

  // Banner
  const { data, loading } = useFetch(() =>
    fetchMovies({ request: "/movie/upcoming" })
  );

  // Movies
  const { data: movies, error } = useFetch(() =>
    fetchMovies({ request: "/trending/movie/day" })
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

            {/* Movies */}
            <View className="flex-1 px-4">
              <Text className="text-lg font-semibold text-action mb-4">
                Trending Movies
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
