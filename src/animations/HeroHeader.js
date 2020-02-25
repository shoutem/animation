import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from './View';
import { DriverShape } from '../drivers/DriverShape';
/*
 * HeroHeader adds complex effect to its children components.
 * Connect it to driver to animate it.
 * e.g.:
 * ...
 * const driver = new ScrollDriver();
 *
 * return (
 *    <Screen styleName="full-screen">
 *      <HeroHeader driver={driver}>
 *          <Image />
 *      </HeroHeader>
 *      <ScrollView
 *        {...driver.scrollViewProps}
 *      >
 *        <Title>Title</Title>
 *      </ScrollView>
 *    </Screen>
 * );
 *
 * ...
 * Above code will create scroll dependent parallax animation over Image component
 * where image will be scrolled 1.5 times faster than Title and the image will have
 * a zoom in effect when the scroll reaches the top of the screen (on bounce)
 */
export class HeroHeader extends PureComponent {
  static propTypes = {
    driver: DriverShape.isRequired,
    /**
     * Components to which an effect will be applied
     */
    children: PropTypes.node,
  }
  render() {
    const { driver, children } = this.props;

    return (
      <View animationName="hero" driver={driver}>
        {children}
      </View>
    );
  }
}
