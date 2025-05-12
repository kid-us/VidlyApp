import React from "react";
import { FlatList, Text, View } from "react-native";

interface GenreProps {
  id: number | string;
  name: string;
}

interface Genres {
  genres: GenreProps[];
}

const Genre = ({ genres }: Genres) => {
  return (
    <>
      <Text className="text-gray-400">Genre</Text>
      <View className="flex-row gap-x-2 justify-start mt-2">
        <FlatList
          data={genres}
          renderItem={({ item }) => (
            <Text className="bg-teal-600 text-white px-4 py-1 rounded text-sm">
              {item.name}
            </Text>
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={4}
          columnWrapperStyle={{
            justifyContent: "flex-start",
            gap: 10,
            paddingRight: 5,
            marginBottom: 5,
          }}
          ItemSeparatorComponent={() => <View className="my-2" />}
          scrollEnabled={false}
        />
      </View>
    </>
  );
};

export default Genre;
