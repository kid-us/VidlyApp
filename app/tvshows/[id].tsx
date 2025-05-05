import BackButton from "@/components/BackButton";
import Card from "@/components/Card";
import MovieCast from "@/components/Cast";
import MovieInfo from "@/components/MovieInfo";
import TrailerModal from "@/components/TrailerModal";
import { icons } from "@/constants/icons";
import {
  fetchCasts,
  fetchMovies,
  fetchTrailers,
  fetchTvShowsDetails,
} from "@/services/api";
import useFetch from "@/services/useFetch";
import {
  default as FontAwesome,
  default as FontAwesome5,
} from "@expo/vector-icons/FontAwesome5";
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

const TvShowsDetails = () => {
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

  // Tv Shows
  const { data: tvShows, loading } = useFetch(() =>
    fetchTvShowsDetails(id as string)
  );
  const { data: cast } = useFetch(() => fetchCasts(`${id}`, "tv"));

  // Similar Tv Shows
  const { data: similarTvShows } = useFetch(() =>
    fetchMovies({ request: `/tv/${id}/similar` })
  );

  // Trailers
  const { data: trailer } = useFetch(() => fetchTrailers(`/tv/${id}/videos`));

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
                  uri: `https://image.tmdb.org/t/p/w500${tvShows?.poster_path}`,
                }}
                className="w-full h-[500px]"
                resizeMode="cover"
              />
            </View>

            {/* Title */}
            <View className="flex-col items-start justify-center mt-5 px-5">
              <Text className="text-white text-4xl font-semibold">
                {tvShows?.name}
              </Text>
              <Text className="text-zinc-400 mt-2">"{tvShows?.tagline}"</Text>

              {/* Rate Vote and Release date */}
              <View className="flex-row gap-x-3 my-5">
                <View className="flex-row gap-x-3">
                  <Image source={icons.star} />
                  <Text className="text-white">
                    {Math.round(tvShows?.vote_average ?? 0)}/10
                  </Text>
                </View>

                <Text className="text-zinc-400">
                  {tvShows?.vote_count} votes
                </Text>

                <FontAwesome name="calendar" size={18} color="#777" />
                <Text className="text-zinc-400">
                  {tvShows?.first_air_date.split("-")[0]}
                </Text>
              </View>

              {/* Genre */}
              <Text className="text-gray-400">Genre</Text>
              <View className="flex-row gap-x-2 justify-start mt-2">
                <FlatList
                  data={tvShows?.genres}
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
                    marginBottom: 5,
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
              <MovieInfo label="Overview" value={tvShows?.overview} />

              {/* Status, Seasons and Episodes */}
              <View className="flex-row gap-x-5 items-center justify-center mb-5">
                <Text className="text-zinc-300">
                  Status :
                  <Text className="text-zinc-500"> {tvShows?.status}</Text>
                </Text>

                <Text className="text-zinc-300">
                  Season :
                  <Text className="text-zinc-500">
                    {" "}
                    {tvShows?.number_of_seasons}
                  </Text>
                </Text>

                <Text className="text-zinc-300">
                  Episodes :
                  <Text className="text-zinc-500">
                    {" "}
                    {tvShows?.number_of_episodes}
                  </Text>
                </Text>
              </View>

              {/* Production */}
              <Text className="text-zinc-300">Production Companies</Text>
              <View className="flex-row flex-wrap gap-x-3 justify-start mt-2 mb-8">
                {tvShows?.production_companies.map((g) => (
                  <Text
                    key={g.id}
                    className="text-zinc-400 py-1 rounded text-sm"
                  >
                    {g.name}
                  </Text>
                ))}
              </View>

              {/* Casts */}
              <Text className="text-action/80 text-xl">Casts</Text>
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
                  gap: 14,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                ItemSeparatorComponent={() => <View className="my-2" />}
                keyExtractor={(item) => item.name}
                scrollEnabled={false}
                className="mb-8 mt-6"
              />

              {/* Similar Movies */}
              <Text className="text-action/80 text-xl">Similar Movies</Text>
              <FlatList
                data={similarTvShows?.slice(0, 4)}
                renderItem={({ item }) => (
                  <Card
                    {...item}
                    type="tv"
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

export default TvShowsDetails;
