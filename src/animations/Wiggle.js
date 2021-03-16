import React, { PureComponent } from 'react';
import autoBindReact from 'auto-bind/react';
import PropTypes from 'prop-types';
import { Animated, Easing } from 'react-native';

export default class Wiggle extends PureComponent {
  constructor(props) {
    super(props);

    autoBindReact(this);

    this.animation = new Animated.Value(0);
  }

  componentDidUpdate() {
    const { startAnimation } = this.props;

    if (startAnimation) {
      this.triggerAnimation();
    }
  }

  triggerAnimation() {
    Animated.timing(this.animation, {
      duration: 400,
      toValue: 3,
      ease: Easing.bounce,
    }).start(() => {
      this.animation.setValue(0);
    });
  }

  render() {
    const { children, style } = this.props;

    const interpolated = this.animation.interpolate({
      inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
      outputRange: [0, -5, 0, 5, 0 , -5, 0],
    });
    const animatedStyle = {
      paddingHorizontal: 5,
      transform: [
        { translateX: interpolated },
      ]
    };

    return (
      <Animated.View
        style={[style, animatedStyle]}
      >
        {children}
      </Animated.View>
    );
  }
}

Wiggle.propTypes = {
  /**
   * If set to true, triggers animation
   */
   startAnimation: PropTypes.bool,
  /**
   * Components to which an effect will be applied
   */
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

Wiggle.defaultProps = {
  startAnimation: false,
};
