import {
  Animated,
  Easing,
} from 'react-native';

import { DriverBase } from './DriverBase';

/**
 * Animation driver that creates animated value changed with time.
 * Pass instance to any @shoutem/animation animation to run it
 * e.g.:
 * driver = new TimingDriver({
 *   duration: 400 // 250 by default,
 *   easing: Easing.inOut // Easing.cubic is passed by default
 *   delay: 200 // 0 by default
 * });
 * return (
 *   <FadeIn driver={driver}>
 *     <Text>I'm fading in</Text>
 *   </FadeIn>
 * );
 * ...
 * Check
 * http://facebook.github.io/react-native/releases/0.30/docs/animations.html#core-api
 * for animation options
 */
export class TimingDriver extends DriverBase {
  constructor(options) {
    super();

    this.animationOptions = {
      easing: Easing.cubic,
      duration: 250,
      ...options,
    };

    this.runTimer = this.runTimer.bind(this);
  }

  runTimer(endValue, onFinish) {
    Animated.timing(
      this.value,
      {
        toValue: endValue,
        ...this.animationOptions,
      }
    ).start(onFinish);
  }
}
