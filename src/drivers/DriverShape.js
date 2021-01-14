import { Animated } from 'react-native';
import PropTypes from 'prop-types';

const driverShape = PropTypes.shape({
  value: PropTypes.instanceOf(Animated.Value),
  interpolate: PropTypes.func,
});

export default driverShape;
