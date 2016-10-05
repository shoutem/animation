import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import {
  ZoomIn,
  TouchableDriver,
} from '@shoutem/animation';


import {
  Button,
  Row,
  Icon,
  Text,
  View,
} from '@shoutem/ui';

export default class ZoomInTouchableExample extends Component {
  render() {
    const driver = new TouchableDriver();

    return (
      <View>
        <Row>
          <View styleName="horizontal h-center">
            <ZoomIn driver={driver} maxFactor={1.3}>
              <Button {...driver.touchableViewProps}>
                <Icon name="add-to-favorites-full" />
                <Text>I'M ZOOMING IN</Text>
              </Button>
            </ZoomIn>
          </View>
        </Row>
      </View>
    );
  }
}

