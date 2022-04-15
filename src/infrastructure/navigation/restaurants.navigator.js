import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {createStackNavigator, TransitionPresets} from "@react-navigation/stack";

const RestaurantStack = createStackNavigator();
import {RestaurantsScreen} from "../../features/restaurants/screens/restaurants.screen";

import RestaurantDetailScreen from "../../features/restaurants/screens/restaurant-detail.screen";
const RestaurantsNavigator = () => {
  return (
    <RestaurantStack.Navigator
      screenOptions={{...TransitionPresets.ModalPresentationIOS}}>
      <RestaurantStack.Screen
        options={{headerShown: false}}
        name="RestaurantsScreen"
        component={RestaurantsScreen}
      />
      <RestaurantStack.Screen
        options={{headerShown: false}}
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
      />
    </RestaurantStack.Navigator>
  );
};

export default RestaurantsNavigator;
