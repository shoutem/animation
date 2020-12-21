import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DriverShape } from '../drivers/DriverShape';
import { View } from './View';
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
export default class ZoomIn extends PureComponent {
  static propTypes = {
    /**
     * An instance of animation driver, usually ScrollDriver
     */
    driver: DriverShape.isRequired,
    /**
     * Components to which an effect will be applied
     */
    children: PropTypes.node.isRequired,
    /**
     * pair of [start, end] values from animation driver, how
     * children would zoom in to maxFactor
     */
    inputRange: PropTypes.array,
    /**
     * To which factor children would zoom in
     */
    maxFactor: PropTypes.number,
    style: PropTypes.object,
  };

  static defaultProps = {
    inputRange: [0, 1],
    maxFactor: 1.5,
    style: {},
  };

  render() {
    const { driver, children, inputRange, maxFactor, style } = this.props;

    return (
      <View
        driver={driver}
        animationName="zoomIn"
        animationOptions={{ inputRange, maxFactor }}
        style={style}
      >
        {children}
      </View>
    );
  }
}
