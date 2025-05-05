import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

const BackButton = () => {
  return (
    <TouchableOpacity
      className="absolute top-4 left-0 right-0 mx-2 w-14 h-14 bg-zinc-900/80 border border-gray-700 rounded-3xl py-3.5 items-center justify-center z-50"
      onPress={router.back}
    >
      <FontAwesome5 name="chevron-left" color="#eee" size={20} />
    </TouchableOpacity>
  );
};

export default BackButton;
