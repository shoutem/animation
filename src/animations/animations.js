export const animations = {
  heroAnimation(driver, { layout, animationOptions }) {
    return {
      transform: [
        {
          scale: driver.value.interpolate({
            inputRange: [-0.9 * layout.height, 0],
            outputRange: [3, 1],
            extrapolateRight: 'clamp',
          }),
        }, {
          translateY: driver.value.interpolate({
            inputRange: [-100, 100],
            outputRange: [-50, 50],
            extrapolateLeft: 'clamp',
          }),
        },
      ],
    };
  },
  zoomOutAnimation(driver, { layout, animationOptions }) {
    const { inputRange, maxFactor } = animationOptions;
    return {
      transform: [
        {
          scale: driver.value.interpolate({
            inputRange,
            outputRange: [maxFactor, 1],
            extrapolateRight: 'clamp',
          }),
        },
      ],
    };
  },
  zoomInAnimation(driver, { layout, animationOptions }) {
    const { inputRange, maxFactor } = animationOptions;
    return {
      transform: [
        {
          scale: driver.value.interpolate({
            inputRange,
            outputRange: [1, maxFactor],
            extrapolateRight: 'clamp',
          }),
        },
      ],
    };
  },
  fadeOutAnimation(driver, { layout, animationOptions }) {
    const { inputRange } = animationOptions;
    return {
      opacity: driver.value.interpolate({
        inputRange,
        outputRange: [1, 0],
        extrapolate: 'clamp',
      }),
    };
  },
  fadeInAnimation(driver, { layout, animationOptions }) {
    const { inputRange } = animationOptions;
    return {
      opacity: driver.value.interpolate({
        inputRange,
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
    };
  },
  slideInAnimation(driver, { layout, animationOptions }) {
    const { offset, inputRange } = animationOptions;
    const { x = 0, y = 0 } = offset;

    return {
      transform: [
        {
          translateY: driver.value.interpolate({
            inputRange,
            outputRange: [y, 0],
            extrapolate: 'clamp',
          }),
        },
        {
          translateX: driver.value.interpolate({
            inputRange,
            outputRange: [x, 0],
            extrapolate: 'clamp',
          }),
        }
      ],
    };
  },
  slideOutAnimation(driver, { layout, animationOptions }) {
    const { offset, inputRange } = animationOptions;
    const { x = 0, y = 0 } = offset;
    return {
      transform: [
        {
          translateY: driver.value.interpolate({
            inputRange,
            outputRange: [0, y],
            extrapolate: 'clamp',
          }),
        }, {
          translateX: driver.value.interpolate({
            inputRange,
            outputRange: [0, x],
            extrapolate: 'clamp',
          }),
        }
      ],
    };
  },
  rotateAnimation(driver, { layout, animationOptions }) {
    const {
      inputRange,
      dimension = '',
      angle
    } = animationOptions;

    return {
      transform: [
        {
          [`rotate${dimension.toUpperCase()}`]: driver.value.interpolate({
            inputRange,
            outputRange: ["0deg", angle],
          }),
        },
      ],
    };
  },
};
