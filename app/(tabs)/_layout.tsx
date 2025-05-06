import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import React from "react";
import { SafeAreaView, StatusBar } from "react-native";

const _layout = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar animated={true} backgroundColor={"#080708"} />
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#18181b",
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "#0f0D23",
          },
          tabBarActiveBackgroundColor: "#FFC20B",
          tabBarActiveTintColor: "black",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="home" size={20} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="movie"
          options={{
            title: "Movies",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="movie-filter" size={20} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="tvshow"
          options={{
            title: "Tv Shows",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="live-tv" size={20} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="search" size={20} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default _layout;
