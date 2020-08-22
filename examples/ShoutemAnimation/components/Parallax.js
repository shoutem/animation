import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import autoBind from 'auto-bind';

import { Parallax, ScrollDriver } from '@shoutem/animation';
import {
  ImageBackground,
  Tile,
  Title,
  Subtitle,
} from '@shoutem/ui';

function getRestaurants() {
  return require('./restaurants.json');
}

export default class ParallaxExample extends Component {
  constructor(props) {
    super(props);

    autoBind(this);

    this.driver = new ScrollDriver();
  }

  renderRow(restaurant) {
    return (
      <ImageBackground
        styleName="large-banner"
        source={{ uri: restaurant.image.url }}
        key={restaurant.name}
      >
        <Tile>
          <Parallax driver={this.driver} scrollSpeed={1.2}>
            <Title>{restaurant.name}</Title>
            <Subtitle>{restaurant.address}</Subtitle>
          </Parallax>
        </Tile>
      </ImageBackground>
    );
  }

  render() {
    return (
      <ScrollView {...this.driver.scrollViewProps}>
        {getRestaurants().map(this.renderRow)}
      </ScrollView>
    );
  }
}
