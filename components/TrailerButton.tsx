import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface Props {
  viewTrailer: () => void;
}

const TrailerButton = ({ viewTrailer }: Props) => {
  return (
    <TouchableOpacity
      onPress={viewTrailer}
      className="flex-row flex-1 justify-center items-center w-full h-14 rounded-xl bg-action my-4 gap-x-5"
    >
      <FontAwesome5 name="play" size={18} color={"black"} />
      <Text className="text-black text-lg">Watch Trailer</Text>
    </TouchableOpacity>
  );
};

export default TrailerButton;
