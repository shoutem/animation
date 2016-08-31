import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import {
  ZoomOut,
  ZoomIn,
  TimingDriver,
} from '@shoutem/animation';

import {
  Title,
  Caption,
  Tile,
  View,
} from '@shoutem/ui';

export default class ZoomInOutExample extends Component {
  render() {
    const driver = new TimingDriver({ duration: 3000 });
    driver.runTimer(1);
    return (
      <View>
        <ZoomOut driver={driver} maxFactor={1.3}>
          <Tile>
            <View styleName="content">
              <Title styleName="h-center">I'm zooming out</Title>
              <Caption styleName="h-center">3 seconds</Caption>
            </View>
          </Tile>
        </ZoomOut>
        <ZoomIn driver={driver} maxFactor={1.3}>
          <Tile>
            <View styleName="content">
              <Title styleName="h-center">I'm zooming in</Title>
              <Caption styleName="h-center">3 seconds</Caption>
            </View>
          </Tile>
        </ZoomIn>
      </View>
    );
  }
}

