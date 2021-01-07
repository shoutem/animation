import React, { PureComponent } from 'react';
import autoBindReact from 'auto-bind/react';
import { ScrollView } from 'react-native';
import { Parallax, ScrollDriver } from '@shoutem/animation';
import { ImageBackground, Subtitle, Tile, Title } from '@shoutem/ui';

const restaurants = require('./restaurants.json');

export default class ParallaxExample extends PureComponent {
  constructor(props) {
    super(props);

    autoBindReact(this);

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
        {restaurants.map(this.renderRow)}
      </ScrollView>
    );
  }
}
