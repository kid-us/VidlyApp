import { Text, View } from "react-native";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => {
  return (
    <View className="my-5">
      <Text className="text-zinc-300">{label}</Text>
      <Text className="mt-2 text-zinc-500">{value}</Text>
    </View>
  );
};

export default MovieInfo;
