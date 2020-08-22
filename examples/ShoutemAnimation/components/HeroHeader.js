import React from 'react';
import { ScrollView } from 'react-native';

import {
  Parallax,
  HeroHeader,
  FadeOut,
  FadeIn,
  ScrollDriver,
} from '@shoutem/animation';
import {
  ImageBackground,
  Tile,
  Title,
  Text,
  Subtitle,
  View,
} from '@shoutem/ui';

function getRestaurant() {
  return require('./restaurants.json')[0];
}

// import/prefer-default-export const cannot be default export
// eslint-disable-next-line
export const HeroHeaderExample = () => {
  const restaurant = getRestaurant();
  const driver = new ScrollDriver();

  return (
    <ScrollView {...driver.scrollViewProps}>
      <HeroHeader driver={driver}>
        <ImageBackground
          styleName="large-banner"
          source={{ uri: restaurant.image.url }}
          key={restaurant.name}
        >
          <Tile>
            <Parallax driver={driver} scrollSpeed={1.2} header>
              <FadeIn inputRange={[-20, 0]} driver={driver}>
                <FadeOut inputRange={[100, 150]} driver={driver}>
                  <Title>{restaurant.name}</Title>
                  <Subtitle>{restaurant.address}</Subtitle>
                </FadeOut>
              </FadeIn>
            </Parallax>
          </Tile>
        </ImageBackground>
      </HeroHeader>
      <View
        styleName="content"
        style={{
          backgroundColor: 'white',
          height: 700,
          padding: 15,
        }}
      >
        <Text>{restaurant.description}</Text>
      </View>
    </ScrollView>
  );
};
