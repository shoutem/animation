import { Animated } from 'react-native';

/**
 * Checks if a style value is animated.
 *
 * @param value The value to check.
 * @returns {boolean} `true` if a value is animated, `false` otherwise.
 */
export const isAnimatedStyleValue = (value) => value && typeof value.interpolate === 'function';

/**
 * Gets the current value of an animated style value. If
 * a value isn't animated, the original value will be returned.
 *
 * @param value The style value.
 * @return {*} The current value of a provided animated value.
 */
export const getAnimatedStyleValue = (value) => {
  if (isAnimatedStyleValue(value)) {
    // If this is an animated value, we want to convert it to
    // a plain object in order to get its current value.
    return value.toJSON();
  }

  return value;
};

/**
 * Finds the closest `AnimatedValue` instance from the given
 * animated style value (e.g., AnimatedInterpolation, etc.).
 * This function will crawl the animated style hierarchy until
 * it finds the first `AnimatedValue` instance.
 *
 * @param animatedStyleValue The starting animated style value.
 * @returns {*} The closest `AnimatedValue`.
 */
const findAnimatedValue = (animatedStyleValue) => {
  if (animatedStyleValue instanceof Animated.Value) {
    return animatedStyleValue;
  }

  const parent = animatedStyleValue._parent;
  if (parent) {
    return findAnimatedValue(parent);
  }

  return undefined;
};

/**
 * Adds a listener to the animated value, or the closest parent
 * that is an animated value. This function is useful in components
 * that receive animated interpolations but need to react to changes
 * of those values during animations.
 *
 * @param styleValue The style value to add the listener to.
 * @param listener The listener to add.
 * @returns {string} The listener id, or `undefined` if the
 *   listener couldn't be registered.
 */
export const addAnimatedValueListener = (styleValue, listener) => {
  const animatedValue = findAnimatedValue(styleValue);
  if (animatedValue) {
    return animatedValue.addListener(listener);
  }

  return undefined;
};

/**
 * Remove the animated value listener with the given id. The
 * listener will be removed from the `styleValue` argument if
 * it is an `AnimatedValue` or the closest `AnimatedValue` parent
 * if it isn't.
 *
 * @param styleValue The style value to remove the listener from.
 * @param listenerId The id of the listener to remove.
 */
export const removeAnimatedValueListener = (styleValue, listenerId) => {
  const animatedValue = findAnimatedValue(styleValue);
  if (animatedValue) {
    animatedValue.removeListener(listenerId);
  }
};
