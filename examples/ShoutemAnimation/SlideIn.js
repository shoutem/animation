import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import {
  SlideIn,
  TimingDriver,
} from '@shoutem/animation';

import {
  Title,
  Caption,
  Tile,
  View,
} from '@shoutem/ui';

export default class SlideInExample extends Component {
  render() {
    const driver = new TimingDriver({ duration: 3000 });
    driver.runTimer(1);
    return (
      <View>
        <SlideIn driver={driver}>
          <Tile>
            <View styleName="content">
              <Title styleName="h-center">I'm rolling around</Title>
              <Caption styleName="h-center">3 seconds</Caption>
            </View>
          </Tile>
        </SlideIn>
      </View>
    );
  }
}

