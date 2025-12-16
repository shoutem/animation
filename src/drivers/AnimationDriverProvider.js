import React, {
  Children,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import DriverShape from './DriverShape';
import ScrollDriver from './ScrollDriver';

export const AnimationDriverContext = createContext({});

const resolveInitialDriver = (props, context) => {
  if (props.driver) {
    return props.driver;
  }
  if (context.animationDriver) {
    return context.animationDriver;
  }
  return new ScrollDriver(
    { useNativeDriver: true, nativeScrollEventThrottle: 20 },
    props.onScroll,
  );
};

/**
 * Use this component if you want to share animation driver between unreachable siblings.
 * Just wrap their parent component with it. We use it to share an instance of ScrollDriver
 * between Screen and NavigationBar automatically. ScrollView from @shoutem/ui uses it to
 * register its driver.
 */
export const AnimationDriverProvider = props => {
  const { children } = props;
  const animationDriverContext = useContext(AnimationDriverContext);
  const [activeAnimationDriver, setActiveAnimationDriver] = useState(
    resolveInitialDriver(props, animationDriverContext),
  );
  const {
    setAnimationDriver: parentSetAnimationDriver,
  } = animationDriverContext;

  const setAnimationDriver = useCallback(
    (driver, primaryScrollView) => {
      if (driver || primaryScrollView) {
        setActiveAnimationDriver(driver);

        if (parentSetAnimationDriver) {
          parentSetAnimationDriver(driver, primaryScrollView);
        }
      }
    },
    [animationDriverContext],
  );

  return (
    <AnimationDriverContext.Provider
      value={{
        setAnimationDriver,
        animationDriver: activeAnimationDriver,
      }}
    >
      {children && Children.only(children)}
    </AnimationDriverContext.Provider>
  );
};

/* eslint-disable react/no-unused-prop-types */
AnimationDriverProvider.propTypes = {
  children: PropTypes.node,
  driver: DriverShape,
  onScroll: PropTypes.func,
};

AnimationDriverProvider.defaultProps = {
  children: undefined,
  driver: undefined,
  onScroll: undefined,
};
