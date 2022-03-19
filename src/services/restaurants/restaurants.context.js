import React, {useState, useContext, createContext, useEffect} from "react";
import {restaurantsRequest, restaurantsTransform} from "./restaurants.service";

export const RestaurantContext = createContext();

export const RestaurantContextProvider = ({children}) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const retrieveRestaurants = () => {
    setIsLoading(true);
    setRestaurants([]);
    setTimeout(() => {
      restaurantsRequest()
        .then(restaurantsTransform)
        .then(results => {
          setError(null);
          setIsLoading(false);
          setRestaurants(results);
        })
        .catch(err => {
          setRestaurants([]);
          setIsLoading(false);
          setError(err);
        });
    }, 3000);
  };

  useEffect(() => {
    retrieveRestaurants();
  }, []);

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        isLoading,
        error,
      }}>
      {children}
    </RestaurantContext.Provider>
  );
};
