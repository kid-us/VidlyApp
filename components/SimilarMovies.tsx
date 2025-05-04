import React, { useState } from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Card from "./Card";

interface Props {
  data: any;
}

const SimilarMovies = ({ data }: Props) => {
  const [longPressedMovie, setLongPressedMovie] = useState<number | null>(null);

  return (
    <>
      <Text className="text-action text-xl">Similar Movies</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Card
            {...item}
            type="tv"
            longPressedMovie={longPressedMovie}
            setLongPressedMovie={setLongPressedMovie}
            containerWidth="w-1/2"
          />
        )}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 10,
          paddingRight: 5,
          marginBottom: 10,
        }}
        ItemSeparatorComponent={() => <View className="my-2" />}
        keyExtractor={(item) => item.id.toFixed(1)}
        scrollEnabled={false}
        className="mt-6"
      />
    </>
  );
};

export default SimilarMovies;
