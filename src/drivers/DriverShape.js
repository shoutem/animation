import { Animated } from 'react-native';
import PropTypes from 'prop-types';

// import/prefer-default-export const cannot be default export
// eslint-disable-next-line
export const DriverShape = PropTypes.shape({
  value: PropTypes.instanceOf(Animated.Value),
  interpolate: PropTypes.func,
});
