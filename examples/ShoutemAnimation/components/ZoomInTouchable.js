import React from 'react';

import { TouchableDriver, ZoomIn } from '@shoutem/animation';
import {
  Button,
  Row,
  Icon,
  Text,
  View,
} from '@shoutem/ui';

// import/prefer-default-export const cannot be default export
// eslint-disable-next-line
export const ZoomInTouchableExample = () =>  {
  const driver = new TouchableDriver();

  return (
    <View>
      <Row>
        <View styleName="horizontal h-center">
          <ZoomIn driver={driver} maxFactor={1.3}>
            <Button {...driver.touchableViewProps}>
              <Icon name="add-to-favorites-full" />
              <Text>TOUCH ME, I'M ZOOMING IN</Text>
            </Button>
          </ZoomIn>
        </View>
      </Row>
    </View>
  );
};
