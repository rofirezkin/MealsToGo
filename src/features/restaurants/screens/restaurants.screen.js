import React, {useContext} from "react";
import {Searchbar, ActivityIndicator, Colors} from "react-native-paper";
import {FlatList} from "react-native";
import styled from "styled-components/native";
import {RestaurantInfoCard} from "../components/restaurant-info-card.component";
import {Spacer} from "../../../components/spacer/spacer.component";
import {SafeArea} from "../../../components/utility/safe-area.component";
import {RestaurantContext} from "../../../services/restaurants/restaurants.context";

const SearchContainer = styled.View`
  margin: ${props => props.theme.space[3]};
`;
export const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 10,
  },
})``;
const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const RestaurantsScreen = () => {
  const {isLoading, error, restaurants} = useContext(RestaurantContext);

  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      )}
      <SearchContainer>
        <Searchbar />
      </SearchContainer>

      <RestaurantList
        data={restaurants}
        renderItem={({item}) => {
          console.log("ite", item);
          return (
            <Spacer position="bottom" size="large">
              <RestaurantInfoCard restaurant={item} />
            </Spacer>
          );
        }}
        keyExtractor={item => item.name}
      />
    </SafeArea>
  );
};
