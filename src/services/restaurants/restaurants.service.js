import {mocks, mockImages} from "./mock";
import camelize from "camelize";
export const restaurantsRequest = (location = "41.878113,-87.629799") => {
  return new Promise((resolve, reject) => {
    const mock = mocks[location];
    if (!mock) {
      reject("not found");
    }

    resolve(mock);
  });
};

export const restaurantsTransform = ({results = []}) => {
  const mappedResults = results.map(restaurant => {
    restaurant.photos = restaurant.photos.map(p => {
      return mockImages[Math.ceil(Math.random() * (mockImages.length - 1))];
    });
    console.log(restaurant.photos);
    return {
      ...restaurant,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
    };
  });
  return camelize(mappedResults);
};

// RestaurantRequest()
//   .then(RestaurantsTransorm)
//   .then(transformedResponse => {
//     console.log(transformedResponse);
//   })
//   .catch(err => {
//     console.log(err);
//   });
