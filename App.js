import React from "react";
import {Text} from "react-native";
import {StatusBar as ExpotatusBar} from "expo-status-bar";
import {RestaurantsScreen} from "./src/features/restaurants/screens/restaurants.screen";
import {ThemeProvider} from "styled-components";
import {theme} from "./src/infrastructure/theme";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import {useFonts as useLato, Lato_400Regular} from "@expo-google-fonts/lato";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import {SafeArea} from "./src/components/utility/safe-area.component";
import {Ionicons} from "@expo/vector-icons";
import {colors} from "./src/infrastructure/theme/colors";
import {RestaurantContextProvider} from "./src/services/restaurants/restaurants.context";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Restaurants: "md-restaurant",
  Map: "md-map",
  Checkout: "md-cart",
  Settings: "md-settings",
};

const createScreenOptions = ({route}) => {
  const iconName = TAB_ICON[route.name];
  return {
    activeTintColor: colors.brand.primary,
    inactiveTintColor: colors.brand.muted,
    tabBarIcon: ({size, color}) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

const Settings = () => (
  <SafeArea>
    <Text>Setting</Text>
  </SafeArea>
);
const Map = () => (
  <SafeArea>
    <Text>MAp</Text>
  </SafeArea>
);

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <RestaurantContextProvider>
          <NavigationContainer>
            <Tab.Navigator screenOptions={createScreenOptions}>
              <Tab.Screen
                options={{headerShown: false}}
                name="Restaurants"
                component={RestaurantsScreen}
              />
              <Tab.Screen
                options={{headerShown: false}}
                name="Map"
                component={Map}
              />
              <Tab.Screen
                options={{headerShown: false}}
                name="Settings"
                component={Settings}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </RestaurantContextProvider>
      </ThemeProvider>
      <ExpotatusBar style="auto" />
    </>
  );
}
