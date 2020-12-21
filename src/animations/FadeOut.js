import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from './View';
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
export default class FadeOut extends PureComponent {
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
     * children would fade out
     */
    inputRange: PropTypes.array,
    style: PropTypes.object,
  };

  static defaultProps = {
    inputRange: [0, 1],
    style: {},
  };

  render() {
    const { children, driver, inputRange, style } = this.props;

    return (
      <View
        animationName="fadeOut"
        animationOptions={{ inputRange }}
        driver={driver}
        style={style}
      >
        {children}
      </View>
    );
  }
}
