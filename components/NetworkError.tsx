import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Text, View } from "react-native";

const NetworkError = ({ insets }: { insets: any }) => {
  return (
    <View
      className="flex-1 bg-primary flex justify-center items-center"
      style={{ paddingTop: insets.top - 10 }}
    >
      <MaterialIcons name="network-check" size={84} color="gray" />
      <Text className="text-white text-2xl mt-5 px-4 justify-center items-center">
        No Internet Connection
      </Text>
      <Text className="text-zinc-400 mt-2">
        Please check your network settings and try again.
      </Text>
    </View>
  );
};

export default NetworkError;
