import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from './../View';
import { DriverShape } from '../../drivers/DriverShape';
import { measure } from '../../components/measure';

class Slide extends PureComponent {
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
     * children would slide
     */
    inputRange: PropTypes.array,
    /**
     * direction of where children would slide to e.g. "top right"
     */
    direction: PropTypes.string,
    animationName: PropTypes.string,
    style: PropTypes.object,
  };

  render() {
    const {
      driver,
      children,
      inputRange = [0, 1],
      style,
      direction,
      animationName
    } = this.props;

    const {
      layout
    } = this.state;

    const offset = direction.split(' ').reduce((offset = {}, position) => {
      if (position.toLowerCase() === "top") {
        offset['y'] = -(layout.pageY + layout.height);
      } else if (position.toLowerCase() === "left") {
        offset['x'] = -(layout.pageX + layout.width);
      } else if (position.toLowerCase() === "bottom") {
        offset['y'] = layout.pageY + layout.height;
      } else if (position.toLowerCase() === "right") {
        offset['x'] = layout.pageX + layout.width;
      }
      return offset;
    }, {});

    return (
      <View
        driver={driver}
        animationName={animationName}
        animationOptions={{ inputRange, offset }}
        style={style}
      >
        {children}
      </View>
    );
  }
}

const measuredSlide = measure(Slide);

export {
  measuredSlide as Slide
}
