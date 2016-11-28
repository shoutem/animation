import React, { Component } from 'react';
import { View } from 'react-native';
import { ZoomOut } from './ZoomOut';
import { Parallax } from './Parallax';
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
export class HeroHeader extends Component {
  static propTypes = {
    driver: DriverShape.isRequired,
    /**
     * Components to which an effect will be applied
     */
    children: React.PropTypes.node,
  }
  constructor(props) {
    super(props);
    this.onLayout = this.onLayout.bind(this);
    this.state = {
      height: 240,
    };
  }
  onLayout(event) {
    const { height } = event.nativeEvent.layout;
    this.setState({ height });
  }

  render() {
    const { driver, children } = this.props;

    return (
      <View onLayout={this.onLayout}>
        <ZoomOut
          driver={driver}
          inputRange={[-(0.9 * this.state.height), 0]}
          maxFactor={3}
        >
          <Parallax
            driver={driver}
            scrollSpeed={0.5}
            insideScroll
            header
            extrapolation={{ extrapolateLeft: 'clamp' }}
          >
            {children}
          </Parallax>
        </ZoomOut>
      </View>
    );
  }
}
