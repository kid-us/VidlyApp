import avatar from "@/assets/images/avatar.png";
import { Image, Text, View } from "react-native";

interface CastProps {
  image: string | null;
  characterName: string;
  name: string;
}

const MovieCast = ({ name, characterName, image }: CastProps) => {
  return (
    <View className="w-1/3">
      <Image
        source={
          image ? { uri: `https://image.tmdb.org/t/p/w500/${image}` } : avatar
        }
        style={{ width: 80, height: 80, borderRadius: 40 }}
      />
      <Text className="text-sm" style={{ color: "#ccc", marginTop: 5 }}>
        {name}
      </Text>
      <Text style={{ color: "#aaa", fontSize: 10, textAlign: "center" }}>
        As "{characterName}"
      </Text>
    </View>
  );
};

export default MovieCast;
