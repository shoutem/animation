import React, { PureComponent } from 'react';
import { View, PanResponder, LayoutAnimation } from 'react-native';
import PropTypes from 'prop-types';
import autoBind from 'auto-bind';

function getDistanceBetweenTwoPoints({ x: x1, y: y1 }, { x: x2, y: y2 }) {
  const dx = Math.abs(x1 - x2);
  const dy = Math.abs(y1 - y2);

  return Math.sqrt((dx ** 2) + (dy ** 2));
}

function middle1D(p1, p2) {
  return p1 > p2 ? p1 - (p1 - p2) / 2 : p2 - (p2 - p1) / 2;
}

function middle2D({ x: x1, y: y1 }, { x: x2, y: y2 }) {
  return {
    x: middle1D(x1, x2),
    y: middle1D(y1, y2),
  };
}

function maxOffset(offset, windowDimension, imageDimension) {
  const max = windowDimension - imageDimension;
  if (max >= 0) {
    return 0;
  }

  return offset < max ? max : offset;
}

function getOffsetByZoom({ width, height, zoom }, { componentWidth, componentHeight }) {
  const xDiff = componentWidth * zoom - width;
  const yDiff = componentHeight * zoom - height;

  return {
    left: -xDiff / 2,
    top: -yDiff / 2,
  };
}

function isMoveSmall(gesture) {
  return Math.abs(gesture.dx) < 2 && Math.abs(gesture.dy) < 2;
}

/**
 * makeZoomable
 *
 * makes the provided component zoomable.
 *
 * @param ComponentToBeDecorated
 * @returns zoomable component
 */
export default function makeZoomable(ComponentToBeDecorated) {
  /**
   * ZoomDecorator renders the ComponentToBeDecorated within a view with PanResponder.
   * It creates the zoom and move effect by detecting pinch and move gestures performed
   * within the view and updates the style of the decorated component with new values
   * for width, height and absolute position.
   */
  class ZoomDecorator extends PureComponent {
    static propTypes = {
      componentWidth: PropTypes.number.isRequired,
      componentHeight: PropTypes.number.isRequired,
      style: PropTypes.object,
      onPress: PropTypes.func,
      onZoom: PropTypes.func,
    }

    static defaultProps = {
      style: {},
      onPress: () => {},
      onZoom: () => {},
    }

    constructor(props) {
      super(props);

      autoBind(this);

      this.state = {
        zoom: null,
        minZoom: null,
        layoutKnown: false, // has the layout been calculated
        isZooming: false, // is the component being zoomed at the moment
        isMoving: false, // is the component being moved at the moment
        initialDistance: null,
        initialX: null,
        initialY: null,
        offsetTop: 0,
        offsetLeft: 0,
        initialTop: 0,
        initialLeft: 0,
        initialTopWithoutZoom: 0,
        initialLeftWithoutZoom: 0,
        initialZoom: 1,
        top: 0,
        left: 0,
      };
    }

    componentDidMount() {
      const { onPress, onZoom } = this.props;
      const { isMoving, isZooming } = this.state;

      this._panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onStartShouldSetPanResponderCapture: () => true,
        onMoveShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderGrant: () => { },
        onPanResponderMove: (evt, gesture) => {
          const { touches } = evt.nativeEvent;
          const touch1 = touches[0];
          const touch2 = touches[1];

          if (touches.length === 2) {
            this.processPinch(touch1, touch2);
            if (onZoom) onZoom();
          } else if (touches.length === 1 && !isZooming && !isMoveSmall(gesture)) {
            // Process touch only if touch (move) is very small so that we can ignore it,
            // and consider that small move it isn't panning.
            // small touch will be processed by calling props.onPress()
            // in onPanResponderRelease()
            this.processTouch(touch1.pageX, touch1.pageY);
          }
        },

        onPanResponderTerminationRequest: () => false,
        // Due to changes in RN>0.26, onPanResponderTerminationRequest should be
        // set false, as with `true`,
        // Modal takes over PanResponder handlers and PanResponder then doesn't work :(
        onPanResponderRelease: () => {
          if (!isMoving && !isZooming && onPress) {
            onPress();
          }
          this.setState({
            isZooming: false,
            isMoving: false,
          });
        },
        onPanResponderTerminate: () => { },
        onShouldBlockNativeResponder: () => true,
      });
    }

    processPinch(touch1, touch2) {
      const { componentHeight, componentWidth } = this.props;
      const {
        height,
        initialDistance,
        initialLeftWithoutZoom,
        initialTopWithoutZoom,
        initialZoom,
        isZooming,
        minZoom,
        left,
        top,
        width,
        zoom,
      } = this.state;

      const point1 = { x: touch1.pageX, y: touch1.pageY };
      const point2 = { x: touch2.pageX, y: touch2.pageY };
      const distance = getDistanceBetweenTwoPoints(point1, point2);
      const center = middle2D(point1, point2);

      if (!isZooming) {
        const offsetByZoom = getOffsetByZoom(this.state, this.props);
        this.setState({
          isZooming: true,
          initialDistance: distance,
          initialX: center.x,
          initialY: center.y,
          initialTop: top,
          initialLeft: left,
          initialZoom: zoom,
          initialTopWithoutZoom: top - offsetByZoom.top,
          initialLeftWithoutZoom: left - offsetByZoom.left,
        });
      } else {
        const touchZoom = distance / initialDistance;
        const newZoom = touchZoom * initialZoom > minZoom
          ? touchZoom * initialZoom : minZoom;

        const offsetByZoom = getOffsetByZoom(this.state, this.props);
        const newLeft = (initialLeftWithoutZoom * touchZoom) + offsetByZoom.left;
        const newTop = (initialTopWithoutZoom * touchZoom) + offsetByZoom.top;

        LayoutAnimation.easeInEaseOut();
        this.setState({
          newZoom,
          left: newLeft > 0 ? 0 : maxOffset(newLeft, width, componentWidth * zoom),
          top: newTop > 0 ? 0 : maxOffset(newTop, height, componentHeight * zoom),
        });
      }
    }

    processTouch(x, y) {
      const { componentHeight, componentWidth } = this.props;
      const {
        height,
        initialLeft,
        initialTop,
        initialX,
        initialY,
        isMoving,
        left,
        top,
        width,
        zoom,
      } = this.state;

      if (!isMoving) {
        this.setState({
          isMoving: true,
          initialX: x,
          initialY: y,
          initialTop: top,
          initialLeft: left,
        });
      } else {
        const newLeft = initialLeft + x - initialX;
        const newTop = initialTop + y - initialY;

        const zoomedWidth = componentWidth * zoom;
        const zoomedHeight = componentHeight * zoom;

        LayoutAnimation.easeInEaseOut();
        this.setState({
          left: newLeft > 0 ? 0 : maxOffset(newLeft, width, zoomedWidth),
          top: newTop > 0 ? 0 : maxOffset(newTop, height, zoomedHeight),
        });
      }
    }

    _onLayout(event) {
      const { componentHeight, componentWidth } = this.props;
      const { height, width } = this.state;
      const { nativeEvent: { layout } } = event;

      if (layout.width === width && layout.height === height) {
        return;
      }

      const zoom = layout.width / componentWidth;
      const offsetTop = layout.height > componentHeight * zoom
        ? (layout.height - componentHeight * zoom) / 2
        : 0;

      this.setState({
        layoutKnown: true,
        width: layout.width,
        height: layout.height,
        zoom,
        offsetTop,
        minZoom: zoom,
      });
    }

    render() {
      const {
        componentHeight,
        componentWidth,
        style,
        ...otherProps
      } = this.props;
      const {
        left,
        offsetLeft,
        offsetTop,
        top,
        zoom,
      } = this.state;

      return (
        <View
          style={style}
          onLayout={this._onLayout}
          {...this._panResponder.panHandlers}
        >
          <ComponentToBeDecorated
            style={[style, {
              position: 'absolute',
              top: offsetTop + top,
              left: offsetLeft + left,
              width: componentWidth * zoom,
              height: componentHeight * zoom,
            }]}
            {...otherProps}
          />
        </View>
      );
    }
  }

  return ZoomDecorator;
}
