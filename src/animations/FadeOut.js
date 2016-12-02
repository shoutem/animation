import React, { Component } from 'react';
import { Animated, View } from 'react-native';
import { DriverShape } from '../drivers/DriverShape';
/*
 * FadeOut Component adds fade out effect to its children components.
 * Connect it to driver and pass the input range to animate it.
 * e.g.:
 * ...
 * const driver = new ScrollDriver();
 *
 * return (
 *  <ScrollView
 *    {...driver.scrollViewProps}
 *  >
 *    <FadeOut
 *      driver={driver}
 *      inputRange={[100,150]}
 *    >
 *      <Image />
 *    </FadeOut>
 *  </ScrollView>
 * );
 *
 * ...
 * Above code will create scroll dependent fade out animation over Image component
 * from scroll 100, to scroll 150 where image is opaque at scroll 100,
 * and fully transparent at scroll 150
 */
export class FadeOut extends Component {
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
     * pair of [start, end] values from animation driver, how
     * children would fade out
     */
    inputRange: React.PropTypes.array,
    style: React.PropTypes.object,
  }

  render() {
    const { driver, children, inputRange = [0, 1], style } = this.props;

    return (
      <Animated.View
        style={[style, {
          opacity: driver.value.interpolate({
            inputRange,
            outputRange: [1, 0],
            extrapolate: 'clamp',
          }),
        }]}
      >
        {children}
      </Animated.View>
    );
  }
}
