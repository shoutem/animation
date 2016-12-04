import React, { Component } from 'react';
import { View } from './View';
import { DriverShape } from '../drivers/DriverShape';
import { measure } from '../components/measure';
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
class SlideIn extends Component {
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
     * rotation angle
     */
    angle: React.PropTypes.string,
    dimension: React.PropTypes.string,
    style: React.PropTypes.object,
  };

  render() {
    const {
      driver,
      children,
      inputRange = [0, 1],
      style
    } = this.props;

    const {
      layout
    } = this.state;

    const offset = {
      x: layout ? -(layout.pageX + layout.width) || 0 : 0,
      y: layout ? -(layout.pageY + layout.height) || 0 : 0,
    };

    return (
      <View
        driver={driver}
        animationName="slideIn"
        animationOptions={{ inputRange, offset }}
        style={style}
      >
        {children}
      </View>
    );
  }
}

const measuredSlideIn = measure(SlideIn);

export {
  measuredSlideIn as SlideIn
}
