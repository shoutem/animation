import React, { Component } from 'react';
import ReactNative, { Animated, View, Dimensions, UIManager } from 'react-native';

const findNodeHandle = ReactNative.findNodeHandle;

import { DriverShape } from '../drivers/DriverShape';
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
export class Parallax extends Component {
  static propTypes = {
    /**
     * An instance of animation driver, usually ScrollDriver
     */
    driver: DriverShape.isRequired,
    /**
     * Components to which an effect will be applied
     */
    children: React.PropTypes.node,
    /**
     * extrapolation options for parallax translation
     * if not passed children would be translated by
     * scrollVector * (scrollSpeed - 1) * driver.value
     * where scroll vector is defined by scrolling direction
     */
    extrapolation: React.PropTypes.object,
    /**
     * how fast passed children would scroll
     */
    scrollSpeed: React.PropTypes.number,
    /**
     * Is Parallax placed in or outside the ScrollView
     */
    insideScroll: React.PropTypes.bool,
    /**
     * Is parallax used as header
     */
    header: React.PropTypes.bool,

    style: React.PropTypes.object,
  }

  static defaultProps = {
    insideScroll: true,
    header: false,
  }

  constructor(props) {
    super(props);
    this.translation = new Animated.Value(0);
    this.calculateTranslation = this.calculateTranslation.bind(this);
    this.measure = this.measure.bind(this);
    this.handleMeasure = this.handleMeasure.bind(this);
    this.state = {
      y: 0,
    };
  }

  handleMeasure(x, y, width, height, pageX, pageY) {
    this.setState({ x: pageX, y: pageY });
  };

  measure() {
    UIManager.measure(findNodeHandle(this), this.handleMeasure);
  }

  componentDidMount() {
    requestAnimationFrame(this.measure);
  }

  calculateTranslation(scrollOffset) {
    const { y } = this.state;
    const { driver } = this.props;
    const scrollHeight = driver.layout.height;
    this.translation.setValue(scrollOffset.value - (y - scrollHeight / 2));
  }

  componentWillMount() {
    const { driver } = this.props;
    this.animationListener = driver.value.addListener(this.calculateTranslation);
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
