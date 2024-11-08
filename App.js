import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigator from "./HomeStackNavigator";
import FavoriteStackNavigator from "./FavoriteStackNavigator";
import ImportedStackNavigator from "./ImportedStackNavigator";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeStackNavigator} />
        <Tab.Screen name="Favorite" component={FavoriteStackNavigator} />
        <Tab.Screen name="Imported" component={ImportedStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
