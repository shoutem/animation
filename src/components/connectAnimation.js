import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import hoistStatics from 'hoist-non-react-statics';
import _ from 'lodash';

import { DriverShape } from '../drivers/DriverShape';

const ANIMATION_SUFFIX = 'Animation';

function isComponentAnimated(props) {
  return props.animation || props.animationName;
}

function removeAnimationsFromStyle(style) {
  return _.omitBy(style, (value, key) => _.isFunction(value) && _.endsWith(key, ANIMATION_SUFFIX));
}

/**
 * This function transfers styles that are created by animated interpolations
 * and it does that recursively because sometimes style is an object/array
 * which contains styles created by animated interpolations
 */
function transferAnimatedValues(styleValue, animatedStyleValue) {
  if (_.isFunction(animatedStyleValue.interpolate) || _.isUndefined(styleValue)) {
    return animatedStyleValue;
  }

  return undefined;
}

function resolveAnimatedStyle({
  props,
  driver,
  animations,
  layout = {},
  componentName = 'component',
}) {
  const {
    style,
    animation,
    animationName,
    animationOptions,
  } = props;

  if (!isComponentAnimated(props)) {
    return removeAnimationsFromStyle(style);
  }

  const createAnimatedStyle =
    animation ||
    animations[`${animationName}${ANIMATION_SUFFIX}`] ||
    style[`${animationName}${ANIMATION_SUFFIX}`];

  if (!_.isFunction(createAnimatedStyle)) {
    throw new Error(`Animation with name: ${animationName}, you tried to assign to ` +
      `to the ${componentName} doesn't exist. Check ${componentName}'s style or its declaration, ` +
      'to find an exact error');
  }

  if (!driver) {
    throw new Error(`You tried to animate ${componentName} with animation named ${animationName} ` +
      `but you didn't pass driver to ${componentName}.`);
  }

  const animatedStyle = createAnimatedStyle(driver, { layout, animationOptions });

  return _.mergeWith(removeAnimationsFromStyle(style), animatedStyle, transferAnimatedValues);
}

const defaultOptions = {
  createAnimatedComponent: true,
};

/**
 * Higher order component that creates animated component which could be animated by
 * list of passed animations. Animations are ran by driver, that could be send through
 * context as animationDriver, or passed as prop named driver. Driver provides animated value.
 * Each animation is a function which takes driver and context as parameters,
 * animation name should have "Animation" suffix. Context contains animation options,
 * and component's layout.
 * Example animation:
 *
 * fadeOutAnimation(driver, context) {
 *  return {
 *    opacity: driver.value.interpolate({
 *      inputRange: [0, context.layout.height],
 *      outputRange: [1, 0]
 *    })
 *  }
 * }
 *
 * in described animation component would fadeOut when scroll is equal its height
 * @param WrappedComponent component you want to be Animated
 * @param animations collection of available animations
 * @param options additional connect options
 * @param options.createAnimatedComponent determines if the connected component
 *   will be wrapped in an animated component, true by default. You may set this
 *   to false if your component already knows how to work with animated style values.
 */
export function connectAnimation(WrappedComponent, animations = {}, options = defaultOptions) {
  function getComponentDisplayName() {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }

  const componentDisplayName = getComponentDisplayName();

  const AnimatedWrappedComponent = options.createAnimatedComponent ?
    Animated.createAnimatedComponent(WrappedComponent) :
    WrappedComponent;

  class AnimatedComponent extends PureComponent {
    static propTypes = {
      /**
       * Animation Driver an instance of driver that will be used to create animated style
       */
      driver: DriverShape,
      /**
       * Component style (could contain animation functions)
       */
      style: PropTypes.object,
      /**
       * Animation name it should match `${animationName}Animation` function passed in
       * animations collection or component's style.
       * e.g. if animationName is fadeOut there should exist function fadeOutAnimation
       * in animations or style
       */
      animationName: PropTypes.string,
      /**
       * Options that would be passed to animation through context
       */
      animationOptions: PropTypes.object,
      /**
       * Explicit animation function declaration with signature:
       * function (driver, context) {
       *  return {
       *    ...animated style
       *  };
       * }
       * and it should return style object
       */
      animation: PropTypes.func,
    };

    static defaultProps = {
      animationOptions: {},
    };

    static contextTypes = {
      animationDriver: DriverShape,
      transformProps: PropTypes.func,
    };

    static childContextTypes = {
      transformProps: PropTypes.func,
    };

    static displayName = `Animated(${componentDisplayName})`;

    constructor(props, context) {
      super(props, context);

      this.onLayout = this.onLayout.bind(this);
      this.resolveStyle = this.resolveStyle.bind(this);
      this.setWrappedInstance = this.setWrappedInstance.bind(this);
      this.transformProps = this.transformProps.bind(this);

      this.state = {
        layout: {
          height: 0,
          width: 0,
          x: 0,
          y: 0,
        },
        resolvedStyle: removeAnimationsFromStyle(props.style),
      };
    }

    componentDidUpdate(prevProps) {
      if (this.shouldRebuildStyle(prevProps)) {
        this.resolveStyle(this.props, this.getDriver());
      }
    }

    getChildContext() {
      return {
        transformProps: this.transformProps,
      };
    }

    shouldRebuildStyle(prevProps) {
      return prevProps.style !== this.props.style ||
        prevProps.animation !== this.props.animation ||
        prevProps.animationName !== this.props.animationName ||
        this.getDriver(prevProps) !== this.getDriver(this.props);
    }

    onLayout(event) {
      const { layout } = event.nativeEvent;
      const driver = this.getDriver();

      if (!_.isEqual(layout, this.state.layout)) {
        this.setState({ layout }, () => this.resolveStyle(this.props, driver));
      }
    }

    getDriver(props = this.props, context = this.context) {
      return props.driver || context.animationDriver;
    }

    resolveStyle(props, driver) {
      this.setState({
        resolvedStyle: resolveAnimatedStyle({
          props,
          driver,
          animations,
          layout: this.state.layout,
          componentName: WrappedComponent.displayName || WrappedComponent.name,
        }),
      });
    }

    setNativeProps(nativeProps) {
      if (this.wrappedInstance.setNativeProps) {
        this.wrappedInstance.setNativeProps(nativeProps);
      }
    }

    setWrappedInstance(component) {
      this.wrappedInstance = component;
    }

    /**
     * A helper function provided to child components that enables
     * them to get the prop transformations that this component performs.
     *
     * @param props The component props to transform.
     * @returns {*} The transformed props.
     */
    transformProps(props) {
      const { transformProps } = this.context;

      const sourceProps = transformProps ? transformProps(props) : props;

      return {
        ...sourceProps,
        style: resolveAnimatedStyle({
          props: sourceProps,
          driver: this.getDriver(sourceProps, this.context),
          animations,
          layout: this.state.layout,
          componentName: WrappedComponent.displayName || WrappedComponent.name,
        }),
      };
    }

    render() {
      const { resolvedStyle } = this.state;
      const ConnectedComponent = isComponentAnimated(this.props) ?
        AnimatedWrappedComponent :
        WrappedComponent;

      return (
        <ConnectedComponent
          onLayout={this.onLayout}
          {...this.props}
          style={resolvedStyle}
          ref={this.setWrappedInstance}
        />
      );
    }
  }

  return hoistStatics(AnimatedComponent, WrappedComponent);
}
