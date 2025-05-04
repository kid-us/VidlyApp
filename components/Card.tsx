import { allGenres } from "@/constants/genres";
import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface CardProps {
  first_air_date?: string;
  name: string;
  type: string;
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
  genre_ids: number[];
  longPressedMovie: number | null;
  setLongPressedMovie: (id: number | null) => void;
  containerWidth?: string;
}

const Card = ({
  first_air_date,
  name,
  type,
  id,
  title,
  poster_path,
  vote_average,
  release_date,
  overview,
  genre_ids,
  longPressedMovie,
  setLongPressedMovie,
  containerWidth,
}: CardProps) => {
  // Getting genre name
  const genreName = (genre: number) => {
    const pick = allGenres.find((g) => g.key === genre);
    return pick ? pick.name : "";
  };

  return (
    <>
      {/* Conditionally show details */}
      {longPressedMovie === id && (
        <View className="absolute -bottom-44 w-[100%] z-50 bg-primary border border-zinc-500 px-5 py-8 rounded-2xl">
          <Text className="text-white text-lg font-bold">{title}</Text>

          {/* Rating */}
          <View className="flex-row gap-x-1 my-2">
            <Image source={icons.star} className="size-6" />
            <Text className="text-white text-lg font-bold">
              {Math.round(vote_average ?? 0)}/10
            </Text>
          </View>

          <Text className="text-zinc-500 text-xs mb-2">
            {release_date.split("-")[0]}
          </Text>

          {/* Genres */}
          <View className="flex-row gap-x-3 mb-5">
            {genre_ids.map((genre) => (
              <Text key={genre} className="text-sm text-teal-500">
                {genreName(genre)}
              </Text>
            ))}
          </View>

          <Text className="text-gray-500 text-xs">{overview}</Text>
        </View>
      )}

      {/* Cards */}
      <Link
        href={type === "movie" ? `/movies/${id}` : `/tvshows/${id}`}
        asChild
      >
        <TouchableOpacity
          className={containerWidth ? containerWidth : "w-1/3"}
          onLongPress={() => setLongPressedMovie(id)}
          onPressOut={() => setLongPressedMovie(null)}
        >
          <Image
            source={{
              uri: poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : "https://placehold.co/600x400/1a1a1a/ffffff.png",
            }}
            className={`${containerWidth ? "h-72" : "h-53"} w-full rounded-lg`}
            resizeMode="cover"
            blurRadius={longPressedMovie && longPressedMovie !== id ? 10 : 0}
          />

          <View className="mt-2">
            <Text
              className={`${
                longPressedMovie && longPressedMovie !== id
                  ? "text-zinc-600"
                  : "text-white"
              }  text-sm`}
              numberOfLines={1}
            >
              {title ? title : name}
            </Text>
          </View>

          {type === "tv" ? (
            <Text className={`text-xs text-zinc-600 mt-1`}>
              {first_air_date?.split("-")[0]}
            </Text>
          ) : (
            <Text className={`text-xs text-zinc-600 mt-1`}>
              {release_date?.split("-")[0]}
            </Text>
          )}
        </TouchableOpacity>
      </Link>
    </>
  );
};

export default Card;
