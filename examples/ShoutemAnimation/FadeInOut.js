import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import {
  FadeOut,
  FadeIn,
  TimingDriver,
} from '@shoutem/animation';

import {
  Title,
  Caption,
  Tile,
  View,
} from '@shoutem/ui';

export default class FadeInOutExample extends Component {
  render() {
    const driver = new TimingDriver({ duration: 3000 });
    driver.runTimer(1);
    return (
      <View>
        <FadeOut driver={driver}>
          <Tile>
            <View styleName="content">
              <Title>I'm fading out</Title>
              <Caption>3 seconds</Caption>
            </View>
          </Tile>
        </FadeOut>
        <FadeIn driver={driver}>
          <Tile>
            <View styleName="content">
              <Title>I'm fading in</Title>
              <Caption>3 seconds</Caption>
            </View>
          </Tile>
        </FadeIn>
      </View>
    );
  }
}

