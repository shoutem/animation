import React from 'react';

import { SlideIn, SlideOut, TimingDriver } from '@shoutem/animation';
import {
  Title,
  Caption,
  Tile,
  View,
} from '@shoutem/ui';

// import/prefer-default-export const cannot be default export
// eslint-disable-next-line
export const SlideInOutExample = () => {
  const driver = new TimingDriver({ duration: 6000 });
  driver.runTimer(14);

  return (
    <View>
      <SlideOut driver={driver} to="top right" inputRange={[8, 9]}>
        <SlideIn driver={driver} from="top right">
          <Tile>
            <View styleName="content">
              <Title styleName="h-center">I am from top right</Title>
              <Caption styleName="h-center">and I will return there</Caption>
            </View>
          </Tile>
        </SlideIn>
      </SlideOut>
      <SlideOut driver={driver} to="top left" inputRange={[9, 10]}>
        <SlideIn driver={driver} from="top left" inputRange={[1, 2]}>
          <Tile>
            <View styleName="content">
              <Title styleName="h-center">I am from top left</Title>
              <Caption styleName="h-center">and I will return there</Caption>
            </View>
          </Tile>
        </SlideIn>
      </SlideOut>
      <SlideOut driver={driver} to="right" inputRange={[10, 11]}>
        <SlideIn driver={driver} from="right" inputRange={[2, 3]}>
          <Tile>
            <View styleName="content">
              <Title styleName="h-center">I am from right</Title>
              <Caption styleName="h-center">and I will return there</Caption>
            </View>
          </Tile>
        </SlideIn>
      </SlideOut>
      <SlideOut driver={driver} to="left" inputRange={[11, 12]}>
        <SlideIn driver={driver} from="left" inputRange={[3, 4]}>
          <Tile>
            <View styleName="content">
              <Title styleName="h-center">I am from left</Title>
              <Caption styleName="h-center">and I will return there</Caption>
            </View>
          </Tile>
        </SlideIn>
      </SlideOut>
      <SlideOut driver={driver} to="bottom right" inputRange={[12, 13]}>
        <SlideIn driver={driver} from="bottom right" inputRange={[4, 5]}>
          <Tile>
            <View styleName="content">
              <Title styleName="h-center">I am from bottom right</Title>
              <Caption styleName="h-center">and I will return there</Caption>
            </View>
          </Tile>
        </SlideIn>
      </SlideOut>
      <SlideOut driver={driver} to="bottom left" inputRange={[13, 14]}>
        <SlideIn driver={driver} from="bottom left" inputRange={[5, 6]}>
          <Tile>
            <View styleName="content">
              <Title styleName="h-center">I am from bottom left</Title>
              <Caption styleName="h-center">and I will return there</Caption>
            </View>
          </Tile>
        </SlideIn>
      </SlideOut>
    </View>
  );
};
