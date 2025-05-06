import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import React from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";

const TabIcon = ({ focused, title, icon }: any) => {
  if (focused) {
    return (
      <View className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded overflow-hidden bg-action">
        <MaterialIcons name={icon} size={21} color={"#000"} />
        <Text className="text-secondary font-bold ml-2 text-sm">{title}</Text>
      </View>
    );
  }

  return (
    <View className="size-full justify-center items-center mt-4 rounded-full">
      <MaterialIcons name={icon} size={21} color={"#A8B5DB"} />
    </View>
  );
};

const _layout = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar animated={true} backgroundColor={"#080708"} />
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#18181b",
            height: 50,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "#0f0D23",
            marginBottom: 50,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} title="Home" icon={"home"} />
            ),
          }}
        />

        <Tabs.Screen
          name="movie"
          options={{
            title: "Movies",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} title="Movies" icon={"movie-filter"} />
            ),
          }}
        />

        <Tabs.Screen
          name="tvshow"
          options={{
            title: "Tv Shows",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} title="Tv Shows" icon={"live-tv"} />
            ),
          }}
        />

        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} title="Search" icon={"search"} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default _layout;
