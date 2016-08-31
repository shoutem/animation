import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import {
  Parallax,
  ScrollDriver,
} from '@shoutem/animation';

import {
  Image,
  Tile,
  Title,
  Subtitle,
} from '@shoutem/ui';

export default class ParallaxExample extends Component {
  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
    this.driver = new ScrollDriver();
  }

  getRestaurants() {
    return require('./restaurants.json');
  }

  renderRow(restaurant) {
    return (
      <Image
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
      </Image>
    );
  }

  render() {
    return (
      <ScrollView {...this.driver.scrollViewProps}>
        {this.getRestaurants().map(this.renderRow)}
      </ScrollView>
    );
  }
}

