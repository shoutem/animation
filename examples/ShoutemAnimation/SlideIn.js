import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import {
  SlideIn,
  SlideOut,
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
    const driver = new TimingDriver({ duration: 6000 });
    driver.runTimer(14);
    return (
      <View>
        <SlideOut driver={driver} to="top right" inputRange={[8,9]}>
          <SlideIn driver={driver} from="top right">
            <Tile>
              <View styleName="content">
                <Title styleName="h-center">I'm rolling around</Title>
                <Caption styleName="h-center">3 seconds</Caption>
              </View>
            </Tile>
          </SlideIn>
        </SlideOut>
        <SlideOut driver={driver} to="top left" inputRange={[9, 10]}>
          <SlideIn driver={driver} from="top left" inputRange={[1,2]}>
            <Tile>
              <View styleName="content">
                <Title styleName="h-center">I'm rolling around</Title>
                <Caption styleName="h-center">3 seconds</Caption>
              </View>
            </Tile>
          </SlideIn>
        </SlideOut>
        <SlideOut driver={driver} to="right" inputRange={[10, 11]}>
          <SlideIn driver={driver} from="right" inputRange={[2,3]}>
            <Tile>
              <View styleName="content">
                <Title styleName="h-center">I'm rolling around</Title>
                <Caption styleName="h-center">3 seconds</Caption>
              </View>
            </Tile>
          </SlideIn>
        </SlideOut>
        <SlideOut driver={driver} to="left" inputRange={[11, 12]}>
          <SlideIn driver={driver} from="left" inputRange={[3,4]}>
            <Tile>
              <View styleName="content">
                <Title styleName="h-center">I'm rolling around</Title>
                <Caption styleName="h-center">3 seconds</Caption>
              </View>
            </Tile>
          </SlideIn>
        </SlideOut>
        <SlideOut driver={driver} to="bottom right" inputRange={[12, 13]}>
          <SlideIn driver={driver} from="bottom right" inputRange={[4,5]}>
            <Tile>
              <View styleName="content">
                <Title styleName="h-center">I'm rolling around</Title>
                <Caption styleName="h-center">3 seconds</Caption>
              </View>
            </Tile>
          </SlideIn>
        </SlideOut>
        <SlideOut driver={driver} to="bottom left" inputRange={[13, 14]}>
          <SlideIn driver={driver} from="bottom left" inputRange={[5,6]}>
            <Tile>
              <View styleName="content">
                <Title styleName="h-center">I'm rolling around</Title>
                <Caption styleName="h-center">3 seconds</Caption>
              </View>
            </Tile>
          </SlideIn>
        </SlideOut>
      </View>
    );
  }
}

