import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactNative, { Animated, View, Dimensions } from 'react-native';

import { DriverShape } from '../drivers/DriverShape';
import { measure } from '../components/measure';
/*
 * Parallax Component adds parallax effect to its children components.
 * Connect it to driver to animate it. By default children will by
 * translated dependent on scroll speed, but you can pass extrapolation options
 * to limit translation.
 * e.g.:
 * ...
 * const driver = new ScrollDriver();
 *
 * return (
 *  <ScrollView
 *    {...driver.scrollViewProps}
 *  >
 *    <Parallax
 *      driver={driver}
 *      scrollSpeed={2}
 *    >
 *      <Image />
 *    </Parallax>
 *    <Title>Title</Title>
 *  </ScrollView>
 * );
 *
 * ...
 * Above code will create scroll dependent parallax animation over Image component
 * where image will be scrolled 2 times faster than Title
 */
class Parallax extends PureComponent {
  static propTypes = {
    /**
     * An instance of animation driver, usually ScrollDriver
     */
    driver: DriverShape.isRequired,
    /**
     * Components to which an effect will be applied
     */
    children: PropTypes.node,
    /**
     * extrapolation options for parallax translation
     * if not passed children would be translated by
     * scrollVector * (scrollSpeed - 1) * driver.value
     * where scroll vector is defined by scrolling direction
     */
    extrapolation: PropTypes.object,
    /**
     * how fast passed children would scroll
     */
    scrollSpeed: PropTypes.number,
    /**
     * Is Parallax placed in or outside the ScrollView
     */
    insideScroll: PropTypes.bool,
    /**
     * Is parallax used as header
     */
    header: PropTypes.bool,

    style: PropTypes.object,
  }

  static defaultProps = {
    insideScroll: true,
    header: false,
  }

  constructor(props) {
    super(props);
    this.translation = new Animated.Value(0);
    this.calculateTranslation = this.calculateTranslation.bind(this);
  }

  calculateTranslation(scrollOffset) {
    const { layout: { pageY } } = this.state;
    const { driver: { layout: { height: scrollHeight } } } = this.props;
    this.translation.setValue(scrollOffset.value - (pageY - scrollHeight / 2));
  }

  componentDidMount() {
    const { driver: { value: { addlistener } } } = this.props;
    this.animationListener = addListener(this.calculateTranslation);
  }

  componentWillUnmount() {
    const { driver } = this.props;
    driver.value.removeListener(this.animationListener);
  }

  render() {
    const {
      scrollSpeed,
      children,
      extrapolation,
      insideScroll,
      style,
      driver,
      header,
    } = this.props;
    const scrollVector = insideScroll ? -1 : 1;
    const scrollFactor = scrollVector * (scrollSpeed - 1);
    const animatedValue = header ? driver.value : this.translation;

    return (
      <Animated.View
        style={[style, {
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [-100, 100],
                outputRange: [-scrollFactor * 100, scrollFactor * 100],
                ...extrapolation,
              }),
            },
          ],
        }]}
      >
        {children}
      </Animated.View>
    );
  }
}

const measuredParralax = measure(Parallax);

export {
  measuredParralax as Parallax
};
