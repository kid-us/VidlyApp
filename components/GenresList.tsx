import { Genres } from "@/constants/genres";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

interface GenresProps {
  genresList: Genres[];
  genre: number | null;
  setGenre: (genre: number | null) => void;
}

const GenresList = ({ genresList, genre, setGenre }: GenresProps) => {
  return (
    <>
      <Text className="text-lg text-action/80">Genres</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-8 mt-3"
        data={genresList}
        contentContainerStyle={{
          gap: 10,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              item.key === 0 ? setGenre(null) : setGenre(item.key)
            }
          >
            <Text
              className={`${
                genre === item.key || (genre === null && item.key === 0)
                  ? "bg-action/80 text-white"
                  : "bg-zinc-900/80 text-white"
              } px-5 py-2 rounded-full text-center text-sm`}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name.toString()}
        ItemSeparatorComponent={() => <View className="w-2" />}
      />
    </>
  );
};

export default GenresList;
