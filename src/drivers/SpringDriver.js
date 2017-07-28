import {
  Animated,
  Easing,
} from 'react-native';

import { DriverBase } from './DriverBase';

/**
 * Animation driver that creates animated value changed with tension and friction.
 * Pass instance to any @shoutem/animation animation to run it
 * e.g.:
 * driver = new SpringDriver({
 *   friction: 4 // 7 by default,
 *   tension: 20 // 40 by default
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
export class SpringDriver extends DriverBase {
  constructor(options) {
    super();

    this.animationOptions = {
      friction: 7,
      tension: 40,
      ...options,
    };

    this.toValue = this.toValue.bind(this);
  }

  toValue(endValue, onFinish) {
    Animated.spring(
      this.value,
      {
        toValue: endValue,
        ...this.animationOptions,
      }
    ).start(onFinish);
  }
}
