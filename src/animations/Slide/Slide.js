import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import measure from '../../components/measure';
import { DriverShape } from '../../drivers/DriverShape';
import { View } from '../View';

class Slide extends PureComponent {
  static propTypes = {
    /**
     * Name of the animation to execute: slideIn or slideOut
     */
    animationName: PropTypes.string.isRequired,
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
     * children would slide
     */
    inputRange: PropTypes.array,
    /**
     * direction of where children would slide to e.g. "top right"
     */
    direction: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    direction: 'top right',
    inputRange: [0, 1],
    style: {},
  };

  render() {
    const {
      driver,
      children,
      inputRange,
      style,
      direction,
      animationName,
    } = this.props;
    const { layout } = this.state;

    // 'type' is unused as we only need 'position'.
    const offset = direction.split(' ').reduce((type, position) => {
      const resolvedOffset = {};
      if (position.toLowerCase() === 'top') {
        resolvedOffset.y = -(layout.pageY + layout.height);
      } else if (position.toLowerCase() === 'left') {
        resolvedOffset.x = -(layout.pageX + layout.width);
      } else if (position.toLowerCase() === 'bottom') {
        resolvedOffset.y = layout.pageY + layout.height;
      } else if (position.toLowerCase() === 'right') {
        resolvedOffset.x = layout.pageX + layout.width;
      }
      return resolvedOffset;
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

// import/prefer-default-export const cannot be default export
// eslint-disable-next-line
export { measuredSlide as Slide };
