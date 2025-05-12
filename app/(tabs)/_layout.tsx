import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#18181b",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0f0D23",
        },
        tabBarActiveBackgroundColor: "#ffc20b",
        tabBarActiveTintColor: "black",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={20} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="movies"
        options={{
          title: "Movies",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="movie-filter" size={20} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="tvshows"
        options={{
          title: "Tv Shows",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="live-tv" size={20} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="search" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
