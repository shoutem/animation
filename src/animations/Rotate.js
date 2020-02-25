import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from './View';
import { DriverShape } from '../drivers/DriverShape';
/*
 * Rotate Component adds rotation effect to its children components.
 * Connect it to driver and pass the input range to animate it.
 * e.g.:
 * ...
 * const driver = new ScrollDriver();
 *
 * return (
 *  <ScrollView
 *    {...driver.scrollViewProps}
 *  >
 *    <Rotate
 *      driver={driver}
 *      inputRange={[100,150]}
 *      angle="180deg"
 *    >
 *      <Image />
 *    </Rotate>
 *  </ScrollView>
 * );
 *
 * ...
 * Above code will create scroll dependent rotation of an Image by 180 degrees
 */
export class Rotate extends PureComponent {
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
     * pair of [start, end] values from animation driver, how
     * children would rotate by an angle in axis
     */
    inputRange: PropTypes.array,
    /**
     * rotation angle e.g. "90deg"
     */
    angle: PropTypes.string,
    /**
     * axis of rotation(x, y, z), z is default
     */
    axis: PropTypes.string,
    style: PropTypes.object,
  };

  render() {
    const {
      driver,
      children,
      inputRange = [0, 1],
      angle = '360deg',
      axis,
      style
    } = this.props;

    return (
      <View
        driver={driver}
        animationName="rotate"
        animationOptions={{ inputRange, angle, axis }}
        style={style}
      >
        {children}
      </View>
    );
  }
}
