import { Link } from "expo-router";
import { Image, Text, TouchableOpacity } from "react-native";

interface Upcoming {
  id: number | string;
  title: string;
  poster: string;
  backdrop_path: string;
}

const Upcoming = ({ id, title, poster, backdrop_path }: Upcoming) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-32 relative">
        <Image
          source={{
            uri: poster
              ? `https://image.tmdb.org/t/p/w500${poster}`
              : `https://image.tmdb.org/t/p/w500${backdrop_path}`,
          }}
          className="w-36 h-48 rounded-lg"
          resizeMode="cover"
        />

        <Text className="text-sm mt-2 text-light-200" numberOfLines={1}>
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default Upcoming;
