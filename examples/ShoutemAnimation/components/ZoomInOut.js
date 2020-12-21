import React from 'react';
import { TimingDriver, ZoomIn, ZoomOut } from '@shoutem/animation';
import { Caption, Tile, Title, View } from '@shoutem/ui';

// import/prefer-default-export const cannot be default export
// eslint-disable-next-line
export const ZoomInOutExample = () => {
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
};
