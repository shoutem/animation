import React from 'react';
import { Rotate, TimingDriver } from '@shoutem/animation';
import { Caption, Tile, Title, View } from '@shoutem/ui';

// import/prefer-default-export const cannot be default export
// eslint-disable-next-line
export const RotateExample = () => {
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
      <Rotate driver={driver} axis="y">
        <Tile>
          <View styleName="content">
            <Title styleName="h-center">I'm rolling around</Title>
            <Caption styleName="h-center">3 seconds</Caption>
          </View>
        </Tile>
      </Rotate>
      <Rotate driver={driver} axis="x">
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
};
