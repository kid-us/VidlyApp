import { Text, View } from "react-native";

interface InfoProps {
  label: string;
  value?: string | number | null;
}

const Info = ({ label, value }: InfoProps) => {
  return (
    <View className="my-5">
      <Text className="text-zinc-300">{label}</Text>
      <Text className="mt-2 text-zinc-500">{value}</Text>
    </View>
  );
};

export default Info;
