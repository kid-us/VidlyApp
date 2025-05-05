import BackButton from "@/components/BackButton";
import MovieCard from "@/components/Card";
import MovieCast from "@/components/MovieCast";
import MovieInfo from "@/components/MovieInfo";
import TrailerModal from "@/components/TrailerModal";
import { icons } from "@/constants/icons";
import {
  fetchCasts,
  fetchMovieDetails,
  fetchMovies,
  fetchTrailers,
} from "@/services/api";
import useFetch from "@/services/useFetch";
import {
  default as FontAwesome,
  default as FontAwesome5,
} from "@expo/vector-icons/FontAwesome5";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const [longPressedMovie, setLongPressedMovie] = useState<number | null>(null);
  const [viewTrailer, setViewTrailer] = useState<string | null>(null);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate fetching data from the server
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  }, []);

  // Movies
  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );
  const { data: cast } = useFetch(() => fetchCasts(`${id}`, "movie"));

  // Similar Movies
  const { data: similarMovies } = useFetch(() =>
    fetchMovies({ request: `/movie/${id}/similar` })
  );

  // Trailers
  const { data: trailer } = useFetch(() =>
    fetchTrailers(`/movie/${id}/videos`)
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
        <View className="bg-primary flex-1">
          {/* Back Button */}
          <BackButton />

          {/* Trailer Modal */}
          {viewTrailer && (
            <TrailerModal
              videoId={viewTrailer}
              onClose={() => setViewTrailer(null)}
            />
          )}

          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={{ paddingBottom: 80 }}
          >
            <View className="relative">
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
                }}
                className="w-full h-[500px]"
                resizeMode="cover"
              />

              <LinearGradient
                colors={["rgba(0, 0, 0, 0.80)", "rgba(1, 1, 1, 0.10)"]}
                start={{ x: 0.5, y: 1 }}
                end={{ x: 0.5, y: 0 }}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
              />
            </View>

            <View className="flex-col items-start justify-center mt-5 px-5">
              <Text className="text-white text-4xl font-semibold">
                {movie?.title}
              </Text>
              <Text className="text-zinc-400 mt-2">"{movie?.tagline}"</Text>

              {/*Rate,  Release date and Runtime */}
              <View className="flex-row items-center gap-x-5 my-5">
                <View className="flex-row gap-x-3">
                  <Image source={icons.star} />
                  <Text className="text-white">
                    {Math.round(movie?.vote_average ?? 0)}/10
                  </Text>
                </View>

                <View className="flex-row gap-x-3">
                  <FontAwesome name="calendar" size={18} color="#777" />
                  <Text className="text-zinc-400">
                    {movie?.release_date.split("-")[0]}
                  </Text>
                </View>

                <View className="flex-row gap-x-3">
                  <FontAwesome name="clock" size={18} color={"#777"} />
                  <Text className="text-zinc-400">{movie?.runtime} min</Text>
                </View>
              </View>

              {/* Genre */}
              <Text className="text-gray-400">Genre</Text>
              <View className="flex-row flex-wrap w-full gap-x-2 justify-start mt-2">
                <FlatList
                  data={movie?.genres}
                  renderItem={({ item }) => (
                    <Text className="bg-teal-600 text-white px-4 py-1 rounded text-sm">
                      {item.name}
                    </Text>
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={3}
                  columnWrapperStyle={{
                    justifyContent: "flex-start",
                    gap: 10,
                    paddingRight: 5,
                    marginBottom: 10,
                  }}
                  ItemSeparatorComponent={() => <View className="my-2" />}
                  scrollEnabled={false}
                />
              </View>

              {/* Trailer Button  */}
              {trailer && trailer.length > 0 && (
                <TouchableOpacity
                  onPress={() => setViewTrailer(trailer[0].key)}
                  className="flex-row flex-1 justify-center items-center w-full h-14 rounded-xl bg-action my-4 gap-x-5"
                >
                  <FontAwesome5 name="play" size={18} color={"black"} />
                  <Text className="text-black text-lg">Watch Trailer</Text>
                </TouchableOpacity>
              )}

              {/* Overview */}
              <MovieInfo label="Overview" value={movie?.overview} />

              {/* Budget and Revenue */}
              <View className="flex flex-row gap-x-16">
                {movie && (
                  <>
                    <MovieInfo
                      label="Budget"
                      value={`$${(
                        Math.round(movie?.budget) / 1_000_000
                      ).toFixed(1)} M`}
                    />

                    <MovieInfo
                      label="Revenue"
                      value={`$${(
                        Math.round(movie?.revenue) / 1_000_000
                      ).toFixed(1)} M`}
                    />
                  </>
                )}
              </View>

              {/* Production */}
              <Text className="text-zinc-300">Production Companies</Text>
              <View className="flex-row flex-wrap gap-x-3 justify-start mt-2 mb-8">
                {movie?.production_companies.map((g) => (
                  <Text
                    key={g.id}
                    className="text-zinc-500 py-1 rounded text-sm"
                  >
                    {g.name}
                  </Text>
                ))}
              </View>

              {/* Casts */}
              <Text className="text-action text-xl">Casts</Text>
              <FlatList
                data={cast}
                renderItem={({ item }) => (
                  <MovieCast
                    characterName={item.character}
                    image={item.profile_path}
                    name={item.name}
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
                keyExtractor={(item) => item.cast_id.toString()}
                scrollEnabled={false}
                className="mb-8 mt-6"
              />

              {/* Recommendation */}
              <Text className="text-action text-xl">Similar Movies</Text>
              <FlatList
                data={similarMovies?.slice(0, 4)}
                renderItem={({ item }) => (
                  <MovieCard
                    {...item}
                    type="movie"
                    longPressedMovie={longPressedMovie}
                    setLongPressedMovie={setLongPressedMovie}
                    containerWidth="w-1/2"
                  />
                )}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 10,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                ItemSeparatorComponent={() => <View className="my-2" />}
                keyExtractor={(item) => item.id.toFixed(1)}
                scrollEnabled={false}
                className="mt-6"
              />
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default MovieDetails;
