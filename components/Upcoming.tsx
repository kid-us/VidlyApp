import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface Upcoming {
  id: number | string;
  type: string;
  name?: string;
  title: string;
  poster: string;
  backdrop_path: string;
}

const Upcoming = ({
  id,
  type,
  title,
  name,
  poster,
  backdrop_path,
}: Upcoming) => {
  return (
    <Link href={type === "movie" ? `/movies/${id}` : `/tvshows/${id}`} asChild>
      <TouchableOpacity className="w-40 relative">
        <Image
          source={{
            uri: poster
              ? `https://image.tmdb.org/t/p/w500${poster}`
              : `https://image.tmdb.org/t/p/w500${backdrop_path}`,
          }}
          className="w-44 h-60 rounded-lg"
          resizeMode="cover"
        />

        {/* Title and Rate */}
        <View>
          <Text className="text-sm mt-2 text-light-200" numberOfLines={1}>
            {title ? title : name}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default Upcoming;
