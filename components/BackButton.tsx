import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const BackButton = () => {
  return (
    <TouchableOpacity
      className="absolute bottom-5 left-0 right-0 mx-5 bg-action/70 rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
      onPress={router.back}
    >
      <Text className="text-black font-semibold text-base">Go Back</Text>
    </TouchableOpacity>
  );
};

export default BackButton;
