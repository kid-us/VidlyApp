import BackButton from "@/components/BackButton";
import CastList from "@/components/CastList";
import CoverImage from "@/components/CoverImage";
import Genre from "@/components/Genre";
import MovieInfo from "@/components/MovieInfo";
import Production from "@/components/Production";
import SimilarItems from "@/components/SimilarItems";
import TrailerButton from "@/components/TrailerButton";
import TrailerModal from "@/components/TrailerModal";
import { icons } from "@/constants/icons";
import {
  fetchCasts,
  fetchMovieDetails,
  fetchMovies,
  fetchTrailers,
} from "@/services/api";
import useFetch from "@/services/useFetch";
import { default as FontAwesome } from "@expo/vector-icons/FontAwesome5";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  Text,
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
            {/* Cover Image */}
            {movie && (
              <CoverImage
                poster={movie.poster_path}
                poster2={movie.backdrop_path}
              />
            )}

            <View className="flex-col items-start justify-center mt-6 px-5">
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
              {movie && movie.genres.length > 0 && (
                <Genre genres={movie.genres} />
              )}

              {/* Trailer Button  */}
              {trailer && trailer.length > 0 && (
                <TrailerButton
                  viewTrailer={() => setViewTrailer(trailer[0].key)}
                />
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
              {movie && movie?.production_companies.length > 0 && (
                <Production production={movie.production_companies} />
              )}

              {/* Casts */}
              {cast && cast.length > 0 && <CastList cast={cast} />}

              {/* Similar Movies */}
              {similarMovies && similarMovies.length > 0 && (
                <SimilarItems similarItems={similarMovies} />
              )}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default MovieDetails;
