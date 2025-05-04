import MovieCast from "@/components/MovieCast";
import MovieInfo from "@/components/MovieInfo";
import { icons } from "@/constants/icons";
import { fetchCasts, fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const { data: movie } = useFetch(() => fetchMovieDetails(id as string));

  const { data: cast } = useFetch(() => fetchCasts(`${id}`));

  console.log("LolOOOOOOO", cast);

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[500px]"
            resizeMode="cover"
          />
        </View>

        {/*  */}
        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white text-2xl font-semibold">
            {movie?.title}
          </Text>
          <Text className="text-zinc-500 mt-1">"{movie?.tagline}"</Text>

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
                  value={`$${(Math.round(movie?.budget) / 1_000_000).toFixed(
                    1
                  )} M`}
                />

                <MovieInfo
                  label="Revenue"
                  value={`$${(Math.round(movie?.revenue) / 1_000_000).toFixed(
                    1
                  )} M`}
                />
              </>
            )}
          </View>

          {/* Production */}
          <Text className="text-zinc-400">Production Companies</Text>
          <View className="flex-row flex-wrap gap-x-3 justify-start mt-2 mb-5">
            {movie?.production_companies.map((g) => (
              <Text key={g.id} className="text-zinc-500 py-1 rounded text-sm">
                {g.name}
              </Text>
            ))}
          </View>

          {/* Casts */}
          <Text className="text-zinc-400">Casts</Text>
          <View className="flex flex-row flex-wrap gap-10 mt-8">
            {cast &&
              cast.length > 0 &&
              cast.map((cast) => (
                <MovieCast
                  key={cast.cast_id}
                  characterName={cast.character}
                  name={cast.name}
                  image={cast.profile_path}
                />
              ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetails;
