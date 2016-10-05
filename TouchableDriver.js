import {
  Animated,
  Easing,
} from 'react-native';

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
export class TouchableDriver {
  constructor(options) {
    this.animationOptions = Object.assign({
      easing: Easing.elastic(1),
      duration: 150,
    }, options);
    this.value = new Animated.Value(0);
    this.onPressIn = this.onPressIn.bind(this);
    this.onPressOut = this.onPressOut.bind(this);
    this.setValue= this.setValue.bind(this);
    this.touchableViewProps = {
      onPressIn: this.onPressIn,
      onPressOut: this.onPressOut,
    };
  }

  onPressIn() {
    this.setValue(1);
  }

  onPressOut() {
    this.setValue(0);
  }

  setValue(value) {
    Animated.timing(
      this.value,
      {
        toValue: value,
        ...this.animationOptions,
      }
    ).start();
  }
}
