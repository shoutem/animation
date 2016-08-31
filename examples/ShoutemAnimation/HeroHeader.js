import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import {
  Parallax,
  HeroHeader,
  FadeOut,
  FadeIn,
  ScrollDriver,
} from '@shoutem/animation';

import {
  Image,
  Tile,
  Title,
  Text,
  Subtitle,
  View,
} from '@shoutem/ui';

export default class HeroHeaderExample extends Component {
  getRestaurant() {
    return require('./restaurants.json')[0];
  }

  render() {
    const restaurant = this.getRestaurant();
    const driver = new ScrollDriver();
    return (
      <ScrollView {...driver.scrollViewProps}>
        <HeroHeader driver={driver}>
          <Image
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
          </Image>
        </HeroHeader>
        <View
          styleName="content"
          style={{
            backgroundColor: 'white',
            height: 700,
            padding: 15,
          }}
        >
            <Text>
              Gaspar is a delightful French restaurant in
              San Francisco’s Financial District that is inspired by the romantic,
              bustling Paris of old. Located near famed Union Square, our richly-designed
              interiors make you feel as if you are truly in Paris and provide the perfect
              setting for enjoying our exquisite classic and modern French fare such as Duck
              Leg Confit and always popular Steak Frites. Gaspar offers two stories of dining
              in addition to full bars both upstairs and downstairs and an exclusive room
              reserved to hold the largest selection of Cognac in San Francisco.
              In addition to our all day menu, we offer live jazz music on Saturdays.</Text>
        </View>
      </ScrollView>
    );
  }
}

