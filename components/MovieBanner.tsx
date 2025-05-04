import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground, Text, View } from "react-native";

interface BannerProps {
  poster_path: string;
  title: string;
  overview: string;
  id: string | number;
  backdrop_path: string;
  name: string;
}

const MovieBanner = ({
  id,
  overview,
  poster_path,
  title,
  backdrop_path,
  name,
}: BannerProps) => {
  return (
    <>
      {backdrop_path && poster_path && (
        <View>
          <ImageBackground
            source={{
              uri: poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : `https://image.tmdb.org/t/p/w500${backdrop_path}`,
            }}
            resizeMode="cover"
          >
            <LinearGradient
              colors={["rgba(0, 0, 0, 0.99)", "rgba(1, 1, 1, 0.30)"]}
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
            {/* Add any other overlay content here */}
            <View className="flex justify-center items-start h-full px-5">
              <View className="mt-64">
                <Text className="text-white text-3xl font-bold">
                  {title ? title : name}
                </Text>
                <Text className="text-zinc-400 mt-5" numberOfLines={5}>
                  {overview}
                </Text>
                {/* <Pressable
                  className="mt-5 w-full px-16 py-2 rounded-lg bg-action"
                  onPress={() => router.push(`/movies/${id}`)}
                >
                  <FontAwesome5
                    name="long-arrow-alt-right"
                    size={20}
                    color={"#fff"}
                  />
                </Pressable> */}
              </View>
            </View>
          </ImageBackground>
        </View>
      )}
    </>
  );
};

export default MovieBanner;
