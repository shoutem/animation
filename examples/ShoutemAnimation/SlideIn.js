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
    driver.runTimer(6);
    return (
      <View>
        <SlideIn driver={driver} from="top right">
          <Tile>
            <View styleName="content">
              <Title styleName="h-center">I'm rolling around</Title>
              <Caption styleName="h-center">3 seconds</Caption>
            </View>
          </Tile>
        </SlideIn>
        <SlideIn driver={driver} from="top left" inputRange={[1,2]}>
          <Tile>
            <View styleName="content">
              <Title styleName="h-center">I'm rolling around</Title>
              <Caption styleName="h-center">3 seconds</Caption>
            </View>
          </Tile>
        </SlideIn>
        <SlideIn driver={driver} from="right" inputRange={[2,3]}>
          <Tile>
            <View styleName="content">
              <Title styleName="h-center">I'm rolling around</Title>
              <Caption styleName="h-center">3 seconds</Caption>
            </View>
          </Tile>
        </SlideIn>
        <SlideIn driver={driver} from="left" inputRange={[3,4]}>
          <Tile>
            <View styleName="content">
              <Title styleName="h-center">I'm rolling around</Title>
              <Caption styleName="h-center">3 seconds</Caption>
            </View>
          </Tile>
        </SlideIn>
        <SlideIn driver={driver} from="bottom right" inputRange={[4,5]}>
          <Tile>
            <View styleName="content">
              <Title styleName="h-center">I'm rolling around</Title>
              <Caption styleName="h-center">3 seconds</Caption>
            </View>
          </Tile>
        </SlideIn>
        <SlideIn driver={driver} from="bottom left" inputRange={[5,6]}>
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

