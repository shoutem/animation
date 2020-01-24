import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from './View';
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
export class ZoomOut extends PureComponent {
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
     * children would zoom out from maxFactor
     */
    inputRange: PropTypes.array,
    /**
     * from which factor children would zoom out
     */
    maxFactor: PropTypes.number,
    style: PropTypes.object,
  }

  render() {
    const { driver, children, inputRange = [0, 1], maxFactor = 1.5, style } = this.props;

    return (
      <View
        driver={driver}
        animationName="zoomOut"
        animationOptions={{ inputRange, maxFactor }}
        style={style}
      >
        {children}
      </View>
    );
  }
}
