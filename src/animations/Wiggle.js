import React, { PureComponent } from 'react';
import { Animated, Easing, Platform } from 'react-native';
import autoBindReact from 'auto-bind/react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const webHeight = { height: Platform.OS === 'web' ? '100%' : undefined };
export default class Wiggle extends PureComponent {
  constructor(props) {
    super(props);

    autoBindReact(this);

    this.animation = new Animated.Value(0);
  }

  componentDidUpdate(prevProps) {
    const { startAnimation: prevStartAnimation } = prevProps;
    const { startAnimation } = this.props;

    if (!prevStartAnimation && startAnimation) {
      this.triggerAnimation();
    }
  }

  triggerAnimation() {
    const { style } = this.props;
    const duration = _.get(style, 'timingConfig.duration');
    const inputRange = _.get(style, 'interpolateConfig.inputRange');
    const toValue = _.last(inputRange);

    Animated.timing(this.animation, {
      duration,
      toValue,
      ease: Easing.bounce,
    }).start(() => {
      this.animation.setValue(0);
    });
  }

  render() {
    const { children, style } = this.props;
    const { interpolateConfig, paddingHorizontal } = style;

    const interpolated = this.animation.interpolate({
      ...interpolateConfig,
    });
    const animatedStyle = {
      paddingHorizontal,
      transform: [{ translateX: interpolated }],
    };

    return (
      <Animated.View style={[webHeight, style, animatedStyle]}>
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
