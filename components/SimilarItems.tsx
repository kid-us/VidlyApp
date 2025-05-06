import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import Card from "./Card"; // Assuming this component exists

interface SimilarMoviesProps {
  similarItems: Movie[];
}

const SimilarItems: React.FC<SimilarMoviesProps> = ({ similarItems }) => {
  const [longPressedMovie, setLongPressedMovie] = useState<number | null>(null);
  return (
    <>
      <Text className="text-action/80 text-xl">Similar Movies</Text>
      <FlatList
        data={similarItems.slice(0, 4)}
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

export default SimilarItems;
