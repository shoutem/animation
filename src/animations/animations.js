export const animations = {
  heroAnimation(driver, { layout }) {
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
  zoomOutAnimation(driver, { animationOptions }) {
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
  zoomInAnimation(driver, { animationOptions }) {
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
  fadeOutAnimation(driver, { animationOptions }) {
    const { inputRange } = animationOptions;
    return {
      opacity: driver.value.interpolate({
        inputRange,
        outputRange: [1, 0],
        extrapolate: 'clamp',
      }),
    };
  },
  fadeInAnimation(driver, { animationOptions }) {
    const { inputRange } = animationOptions;
    return {
      opacity: driver.value.interpolate({
        inputRange,
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
    };
  },
  slideInAnimation(driver, { animationOptions }) {
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
  slideOutAnimation(driver, { animationOptions }) {
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
  rotateAnimation(driver, { animationOptions }) {
    const {
      inputRange,
      axis = '',
      angle
    } = animationOptions;

    return {
      transform: [
        {
          [`rotate${axis.toUpperCase()}`]: driver.value.interpolate({
            inputRange,
            outputRange: ["0deg", angle],
          }),
        },
      ],
    };
  },
};
