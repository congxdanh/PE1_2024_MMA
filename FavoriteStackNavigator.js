import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DetailScreen from "./screens/DetailScreen";
import FavouriteScreen from "./screens/FavouriteScreen";

const Stack = createStackNavigator();

const FavoriteStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favorite" component={FavouriteScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default FavoriteStackNavigator;
