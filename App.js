import {StatusBar as ExpoStatusBar} from "expo-status-bar";
import React from "react";
import {AppRegistry} from "react-native";
import {ThemeProvider} from "styled-components/native";
import {initializeApp, getApp, getApps} from "firebase/app";
import {registerRootComponent} from "expo";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import {useFonts as useLato, Lato_400Regular} from "@expo-google-fonts/lato";
import {theme} from "./src/infrastructure/theme/index";
import {LocationContextProvider} from "./src/services/location/location.context";
import {RestaurantsContextProvider} from "./src/services/restaurants/restaurants.context";
import {Navigation} from "./src/infrastructure/navigation";
import {FavouritesContextProvider} from "./src/services/favourites/favourites.context";
import {AuthenticationContextProvider} from "./src/services/authentication/authentication.context";

const firebaseConfig = {
  apiKey: "AIzaSyD1JzqbP4fBpfFh27zn3vP31KEcA9YHFr0",
  authDomain: "mealstogo-5cbea.firebaseapp.com",
  projectId: "mealstogo-5cbea",
  storageBucket: "mealstogo-5cbea.appspot.com",
  messagingSenderId: "878561430247",
  appId: "1:878561430247:web:85c659e2a74767bc7fb042",
};

if (getApps().length < 1) {
  initializeApp(firebaseConfig);
  // Initialize other firebase products here
}

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
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
registerRootComponent(App);
AppRegistry.registerComponent("App", () => App);
