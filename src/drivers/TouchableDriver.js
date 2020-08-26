import { Animated, Easing } from 'react-native';
import autoBind from 'auto-bind/react';

import DriverBase from './DriverBase';

/**
 * Returns the default animation callback to use.
 *
 * @param {Animated.Value} value
 * @param {double} toValue
 * @param {Object} animationOptions
 * @returns {CompositeAnimation}
 */
function defaultAnimation(value, toValue, animationOptions) {
  return Animated.timing(value, { toValue, ...animationOptions });
}

/**
 * Animation driver that creates an animated value changed on press events.
 *
 * Assign onPressIn and onPressOut props of React Native Touchable*, and
 * pass instance to any @shoutem/animation animation to run it
 * e.g.:
 * driver = new TouchableDriver();
 * ...
 * <TouchableOpacity {...driver.touchableViewProps}>
 * ...
 * <ZoomIn driver={driver}>
 */
export default class TouchableDriver extends DriverBase {
  /**
   * @param {Object} options Animation options.
   */
  constructor(options) {
    super();

    autoBind(this);

    this.animationOptions = {
      easing: Easing.elastic(1),
      duration: 150,
      ...options,
    };
    this.touchableViewProps = {
      onPressIn: this.onPressIn,
      onPressOut: this.onPressOut,
    };
  }

  onPressIn() {
    defaultAnimation(this.value, 1, this.animationOptions).start();
  }

  onPressOut() {
    defaultAnimation(this.value, 0, this.animationOptions).start();
  }
}
