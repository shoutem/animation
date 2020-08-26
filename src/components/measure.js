import { UIManager, findNodeHandle } from 'react-native';
import autoBind from 'auto-bind/react';

export default function measure(Component) {
  class measuredComponent extends Component {
    constructor(props, context) {
      super(props, context);

      autoBind(this);

      this.state = {
        ...super.state,
        // react/no-unused-state used in components created via 'measure'
        // eslint-disable-next-line
        layout: {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          pageX: 0,
          pageY: 0,
        },
      };
    }

    handleMeasure(x, y, width, height, pageX, pageY) {
      // react/no-unused-state used in components created via 'measure'
      // eslint-disable-next-line
      this.setState({ layout:
        {
          x,
          y,
          height,
          width,
          pageX,
          pageY,
        },
      });
    }

    measure() {
      UIManager.measure(findNodeHandle(this), this.handleMeasure);
    }

    // commenting this out as it seems unused elsewhere in the package and requestAnimationFrame
    // is not defined
    // componentDidMount() {
    //   requestAnimationFrame(this.measure);
    //   if (typeof super.componentDidMount === 'function') {
    //     super.componentDidMount();
    //   }
    // }
  }

  return measuredComponent;
}
