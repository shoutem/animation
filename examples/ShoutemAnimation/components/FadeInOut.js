import React from 'react';
import { FadeOut, FadeIn, TimingDriver } from '@shoutem/animation';
import { Caption, Title, Tile, View } from '@shoutem/ui';

export default function FadeInOutExample() {
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
