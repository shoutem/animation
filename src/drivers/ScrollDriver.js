import { Animated } from 'react-native';
import _ from 'lodash';

import { DriverBase } from './DriverBase';

/**
 * Animation driver that creates animated value changed on scroll event.
 * Assign onScroll as onScroll prop of React Native ScrollView, and
 * pass instance to any @shoutem/animation animation to run it
 * e.g.:
 * driver = new ScrollDriver();
 * animation = new Animation({
 *  driver
 * });
 * ...
 * <ScrollView onScroll={onScroll}>
 *
 * This driver initializes a native animated value by default, but
 * it also creates a mirrored JS value as a fallback for animations
 * that are not yet supported in native. The users can control if
 * interpolations will be performed in native or not by passing
 * `useNativeDriver` in the interpolation options.
 *
 * @param options Driver options
 * @param options.useNativeDriver Determines if the native animated value is used.
 * @param options.nativeScrollEventThrottle Native animated value changes
 *   will be debounced using this value when mirroring them to the JS value.
 *   Used only if `useNativeDriver` is `true`, defaults to 20ms.
 */
export class ScrollDriver extends DriverBase {
  constructor(options = { useNativeDriver: false, nativeScrollEventThrottle: 20 }) {
    super();

    if (options.useNativeDriver) {
      this.nativeValue = new Animated.Value(0);

      this.nativeValue.addListener(_.debounce(({ value }) => {
        this.value.setValue(value);
      }), options.nativeScrollEventThrottle);
    }

    this.primaryValue = this.nativeValue || this.value;

    this.onScrollViewLayout = this.onScrollViewLayout.bind(this);
    this.scrollViewProps = {
      onScroll: Animated.event(
        [{ nativeEvent: { contentOffset: { y: this.primaryValue } } }],
        { useNativeDriver: options.useNativeDriver }
      ),
      scrollEventThrottle: 1,
      onLayout: this.onScrollViewLayout,
    };
  }

  onScrollViewLayout(event) {
    this.layout = event.nativeEvent.layout;
  }

  /**
   * Creates an interpolation using the underlying animated
   * value. This function will use the native animated value
   * for the animation, is possible.
   *
   * @param config The animated interpolation config that may
   *   define an additional `useNativeDriver` property which
   *   controls whether this animation can be executed using
   *   the native driver.
   * @returns {*} The animated interpolation.
   */
  interpolate(config) {
    let value = this.value;
    if (config.useNativeDriver && this.nativeValue) {
      value = this.nativeValue;
    }

    const interpolationConfig = { ...config };
    delete interpolationConfig.useNativeDriver;

    return value.interpolate(interpolationConfig);
  }
}
