import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ImportedScreen from "./screens/ImportedScreen";
import DetailScreen from "./screens/DetailScreen";

const Stack = createStackNavigator();

const ImportedStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Imported" component={ImportedScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default ImportedStackNavigator;
