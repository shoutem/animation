import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import {
  Rotate,
  TimingDriver,
} from '@shoutem/animation';

import {
  Title,
  Caption,
  Tile,
  View,
} from '@shoutem/ui';

export default class RotateExample extends Component {
  render() {
    const driver = new TimingDriver({ duration: 3000 });
    driver.runTimer(1);
    return (
      <View>
        <Rotate driver={driver}>
          <Tile>
            <View styleName="content">
              <Title styleName="h-center">I'm rolling around</Title>
              <Caption styleName="h-center">3 seconds</Caption>
            </View>
          </Tile>
        </Rotate>
        <Rotate driver={driver} dimension="y">
          <Tile>
            <View styleName="content">
              <Title styleName="h-center">I'm rolling around</Title>
              <Caption styleName="h-center">3 seconds</Caption>
            </View>
          </Tile>
        </Rotate>
        <Rotate driver={driver} dimension="x">
          <Tile>
            <View styleName="content">
              <Title styleName="h-center">I'm rolling around</Title>
              <Caption styleName="h-center">3 seconds</Caption>
            </View>
          </Tile>
        </Rotate>
        <Rotate driver={driver} angle="180deg">
          <Tile>
            <View styleName="content">
              <Title styleName="h-center">I'm rolling around</Title>
              <Caption styleName="h-center">3 seconds</Caption>
            </View>
          </Tile>
        </Rotate>
      </View>
    );
  }
}

