import React from 'react';
import { ScrollView } from 'react-native';
import {
  FadeOut,
  FadeIn,
  HeroHeader,
  Parallax,
  ScrollDriver,
} from '@shoutem/animation';
import {
  ImageBackground,
  Subtitle,
  Tile,
  Title,
  Text,
  View,
} from '@shoutem/ui';

const firstRestaurant = require('./restaurants.json')[0];

// import/prefer-default-export const cannot be default export
// eslint-disable-next-line
export const HeroHeaderExample = () => {
  const driver = new ScrollDriver();

  return (
    <ScrollView {...driver.scrollViewProps}>
      <HeroHeader driver={driver}>
        <ImageBackground
          styleName="large-banner"
          source={{ uri: firstRestaurant.image.url }}
          key={firstRestaurant.name}
        >
          <Tile>
            <Parallax driver={driver} scrollSpeed={1.2} header>
              <FadeIn inputRange={[-20, 0]} driver={driver}>
                <FadeOut inputRange={[100, 150]} driver={driver}>
                  <Title>{firstRestaurant.name}</Title>
                  <Subtitle>{firstRestaurant.address}</Subtitle>
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
        <Text>{firstRestaurant.description}</Text>
      </View>
    </ScrollView>
  );
};
