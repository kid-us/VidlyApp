import React from "react";
import { FlatList, Text, View } from "react-native";
import MovieCast from "./Cast";

interface CastItem {
  character: string;
  profile_path: string;
  name: string;
}

interface CastListProps {
  cast: CastItem[];
}

const CastList = ({ cast }: CastListProps) => {
  return (
    <>
      <Text className="text-action/80 text-xl">Casts</Text>
      <FlatList
        data={cast}
        renderItem={({ item }) => (
          <MovieCast
            characterName={item.character}
            image={item.profile_path}
            name={item.name}
          />
        )}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 14,
          paddingRight: 5,
          marginBottom: 10,
        }}
        ItemSeparatorComponent={() => <View className="my-2" />}
        keyExtractor={(item) => item.name}
        scrollEnabled={false}
        className="mb-8 mt-6"
      />
    </>
  );
};

export default CastList;
