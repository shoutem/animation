import React, { Component } from 'react';
import { Animated, View } from 'react-native';
import { DriverShape } from '../drivers/DriverShape';
/*
 * ZoomOut Component adds zoom out effect to its children components.
 * Connect it to driver and pass the input range to animate it.
 * e.g.:
 * ...
 * const driver = new ScrollDriver();
 *
 * return (
 *  <ScrollView
 *    {...driver.scrollViewProps}
 *  >
 *    <ZoomOut
 *      driver={driver}
 *      inputRange={[100,150]}
 *      maxFactor={1.5}
 *    >
 *      <Image />
 *    </ZoomOut>
 *  </ScrollView>
 * );
 *
 * ...
 * Above code will create scroll dependent zoom out animation over Image component
 * from scroll 100, to scroll 150 where image is scaled by maxFactor at scroll 100,
 * and has original size at scroll 150
 */
export class ZoomOut extends Component {
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
     * children would zoom out from maxFactor
     */
    inputRange: React.PropTypes.array,
    /**
     * from which factor children would zoom out
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
                outputRange: [maxFactor, 1],
                extrapolateRight: 'clamp',
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
