import React, { Component } from 'react';
import { Animated, View } from 'react-native';
import { DriverShape } from '../drivers/DriverShape';
/*
 * ZoomIn Component adds zoom in effect to its children components.
 * Connect it to driver and pass the input range to animate it.
 * e.g.:
 * ...
 * const driver = new ScrollDriver();
 *
 * return (
 *  <ScrollView
 *    {...driver.scrollViewProps}
 *  >
 *    <ZoomIn
 *      driver={driver}
 *      inputRange={[100,150]}
 *      maxFactor={1.5}
 *    >
 *      <Image />
 *    </ZoomIn>
 *  </ScrollView>
 * );
 *
 * ...
 * Above code will create scroll dependent zoom in animation over Image component
 * from scroll 100, to scroll 150 where image has original size at scroll 100,
 * and is scaled by maxFactor at scroll 150
 */
export class ZoomIn extends Component {
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
     * children would zoom in to maxFactor
     */
    inputRange: React.PropTypes.array,
    /**
     * To which factor children would zoom in
     */
    maxFactor: React.PropTypes.number,
    style: React.PropTypes.object,
  }

  render() {
    const { driver, children, inputRange = [0, 1], maxFactor = 1.5, style } = this.props;

    return (
      <Animated.View
        style={[style, {
          transform: [
            {
              scale: driver.value.interpolate({
                inputRange,
                outputRange: [1, maxFactor],
                extrapolate: 'clamp',
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
