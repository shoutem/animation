import React from 'react';
import { Animated } from 'react-native';

export const DriverShape = React.PropTypes.shape({
  value: React.PropTypes.instanceOf(Animated.Value),
});
