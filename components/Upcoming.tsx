import { Link } from "expo-router";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

interface Upcoming {
  data: Movie[];
  type: string;
}

const Upcoming = ({ data, type }: Upcoming) => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mb-8 mt-3"
      data={data}
      contentContainerStyle={{
        gap: 10,
      }}
      renderItem={({ item }) => (
        <Link
          href={type === "movie" ? `/movies/${item.id}` : `/tvshows/${item.id}`}
          asChild
        >
          <TouchableOpacity className="w-40 relative">
            <Image
              source={{
                uri: item.poster_path
                  ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                  : `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
              }}
              className="w-44 h-60 rounded-lg"
              resizeMode="cover"
            />

            {/* Title and Rate */}
            <View>
              <Text className="text-sm mt-2 text-light-200" numberOfLines={1}>
                {item.title ? item.title : item.name}
              </Text>
            </View>
          </TouchableOpacity>
        </Link>
      )}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <View className="w-4" />}
    />
  );
};

export default Upcoming;
