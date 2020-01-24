import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Slide } from './Slide';
import { DriverShape } from '../../drivers/DriverShape';

/*
 * SlideIn Component adds slide in effect to its children components.
 * Connect it to driver and pass the input range to animate it.
 * e.g.:
 * ...
 * const driver = new ScrollDriver();
 *
 * return (
 *  <ScrollView
 *    {...driver.scrollViewProps}
 *  >
 *    <SlideIn
 *      driver={driver}
 *      inputRange={[100,150]}
 *      to="top right"
 *    >
 *      <Image />
 *    </SlideIn>
 *  </ScrollView>
 * );
 *
 * ...
 * Above code will create scroll dependent slide in of an Image to
 * the top right corner of the screen between scroll position of 100 and 150
 */
export class SlideIn extends PureComponent {
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
     * children would slide in
     */
    inputRange: PropTypes.array,
    /**
     * position from where wrapped components should slide in
     */
    from: PropTypes.string,
    style: PropTypes.object,
  };

  render() {
    const {
      driver,
      children,
      inputRange = [0, 1],
      style,
      from,
    } = this.props;

    return (
      <Slide
        driver={driver}
        animationName="slideIn"
        inputRange={inputRange}
        direction={from}
        style={style}
      >
        {children}
      </Slide>
    );
  }
}
