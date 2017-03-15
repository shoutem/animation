import { Animated } from 'react-native';

/**
 * The base animation driver that all animations
 * drivers should extend. This class defines the
 * common interface of all animation drivers.
 */
export class DriverBase {
  constructor() {
    this.value = new Animated.Value(0);
  }

  /**
   * Creates an interpolation using the underlying animated
   * value.
   *
   * @param config The animated interpolation config.
   * @returns {*} The animated interpolation.
   */
  interpolate(config) {
    return this.value.interpolate(config);
  }
}
