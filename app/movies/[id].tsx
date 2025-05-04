import playBtn from "@/assets/images/play.png";
import MovieCard from "@/components/MovieCard";
import MovieCast from "@/components/MovieCast";
import MovieInfo from "@/components/MovieInfo";
import { icons } from "@/constants/icons";
import { fetchCasts, fetchMovieDetails, fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const [longPressedMovie, setLongPressedMovie] = useState<number | null>(null);

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );
  const { data: cast } = useFetch(() => fetchCasts(`${id}`));

  const { data: similarMovies } = useFetch(() =>
    fetchMovies({ request: `/movie/${id}/similar` })
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
          <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
            <View className="relative">
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
                }}
                className="w-full h-[500px]"
                resizeMode="cover"
              />
              {/* Trailer Button */}
              <TouchableOpacity className="absolute -bottom-7 right-5 z-50">
                <Image source={playBtn} className="size-14" />
              </TouchableOpacity>
            </View>

            {/*  */}
            <View className="flex-col items-start justify-center mt-5 px-5">
              <Text className="text-white text-2xl font-semibold">
                {movie?.title}
              </Text>
              <Text className="text-zinc-400 mt-1">"{movie?.tagline}"</Text>

              {/* Release date and Runtime */}
              <View className="flex-row items-center gap-x-10 mt-5">
                <View className="flex-row gap-x-3">
                  <FontAwesome name="calendar" size={18} color="#777" />
                  <Text className="text-zinc-400">
                    {movie?.release_date.split("-")[0]}
                  </Text>
                </View>

                <View className="flex-row gap-x-3">
                  <FontAwesome name="clock" size={18} color={"#777"} />
                  <Text className="text-zinc-400">{movie?.runtime}</Text>
                </View>
              </View>

              {/* Rate and popularity with vote */}
              <View className="flex-row items-center gap-x-5 mt-5">
                <View className="flex-row gap-x-3 bg-dark-100 py-1 px-2 rounded">
                  <Image source={icons.star} />
                  <Text className="text-white">
                    {Math.round(movie?.vote_average ?? 0)}/10
                  </Text>
                </View>

                <Text className="text-zinc-400">{movie?.vote_count} votes</Text>
              </View>

              {/* Overview */}
              <MovieInfo label="Overview" value={movie?.overview} />

              {/* Genre */}
              <Text className="text-gray-400">Genre</Text>
              <View className="flex-row gap-x-2 justify-start mt-2 mb-5">
                {movie?.genres.map((g) => (
                  <Text
                    key={g.id}
                    className="bg-teal-600 text-white px-4 py-1 rounded text-sm"
                  >
                    {g.name}
                  </Text>
                ))}
              </View>

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
              <Text className="text-zinc-400">Production Companies</Text>
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
                className="my-8"
              />

              {/* Recommendation */}
              <Text className="text-action text-xl">Similar Movies</Text>
              <FlatList
                data={similarMovies?.slice(0, 6)}
                renderItem={({ item }) => (
                  <MovieCard
                    {...item}
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
