import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DriverShape from '../../drivers/DriverShape';
import Slide from './Slide';

/*
 * SlideOut Component adds slide out effect to its children components.
 * Connect it to driver and pass the input range to animate it.
 * e.g.:
 * ...
 * const driver = new ScrollDriver();
 *
 * return (
 *  <ScrollView
 *    {...driver.scrollViewProps}
 *  >
 *    <SlideOut
 *      driver={driver}
 *      inputRange={[100,150]}
 *      to="top left"
 *    >
 *      <Image />
 *    </SlideOut>
 *  </ScrollView>
 * );
 *
 * ...
 * Above code will create scroll dependent slide out of an Image to
 * the top left corner of the screen between scroll position of 100 and 150
 */
export default class SlideOut extends PureComponent {
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
     * children would slide out
     */
    inputRange: PropTypes.array,
    /**
     * position to where wrapped components should slide out
     */
    to: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    inputRange: [0, 1],
    to: 'top left',
    style: {},
  };

  render() {
    const { driver, children, inputRange, style, to } = this.props;

    return (
      <Slide
        driver={driver}
        animationName="slideOut"
        inputRange={inputRange}
        direction={to}
        style={style}
      >
        {children}
      </Slide>
    );
  }
}
