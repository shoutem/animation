import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from './View';
import { DriverShape } from '../drivers/DriverShape';
/*
 * FadeIn Component adds fade in effect to its children components.
 * Connect it to an animation driver and pass the input range to animate it.
 * e.g.:
 * ...
 * const driver = new ScrollDriver();
 *
 * return (
 *  <ScrollView
 *    {...driver.scrollViewProps}
 *  >
 *    <FadeIn
 *      driver={driver}
 *      inputRange={[100,150]}
 *    >
 *      <Image />
 *    </FadeIn>
 *  </ScrollView>
 * );
 *
 * ...
 * Above code will create scroll dependent fade in animation over Image component
 * from scroll position 100, to scroll position 150 where image is fully transparent at
 * scroll position 100, and opaque at scroll position 150
 */
export class FadeIn extends PureComponent {
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
     * children would fade in
     */
    inputRange: PropTypes.array,
  }

  render() {
    const { driver, children, inputRange = [0, 1], style } = this.props;

    return (
      <View
        driver={driver}
        animationName="fadeIn"
        animationOptions={{ inputRange }}
        style={{ opacity: 0, ...style }}
      >
        {children}
      </View>
    );
  }
}
