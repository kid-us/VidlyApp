import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground, Text, View } from "react-native";

interface BannerProps {
  poster_path: string;
  title: string;
  overview: string;
  backdrop_path: string;
  name: string;
}

const Banner = ({
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
            {/* Hero Title and overview */}
            <View className="relative flex justify-center items-start h-full px-5">
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
              <View className="absolute bottom-16 mx-5">
                <Text className="text-white text-3xl font-bold">
                  {title ? title : name}
                </Text>
                <Text className="text-zinc-400 mt-5" numberOfLines={5}>
                  {overview}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      )}
    </>
  );
};

export default Banner;
