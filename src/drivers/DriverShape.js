import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';

export const DriverShape = PropTypes.shape({
  value: PropTypes.instanceOf(Animated.Value),
  interpolate: PropTypes.func,
});
