import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground, View } from "react-native";

interface ImageProps {
  poster: string | null;
  poster2: string | null;
}

const CoverImage = ({ poster, poster2 }: ImageProps) => {
  return (
    <View className="relative">
      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/w500${poster ? poster : poster2}`,
        }}
        className="w-full h-[600px]"
        resizeMode="stretch"
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
  );
};

export default CoverImage;
