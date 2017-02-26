import ReactNative, { UIManager } from 'react-native';

const findNodeHandle = ReactNative.findNodeHandle;

export const measure = Component => {
  class measuredComponent extends Component {
    constructor(props, context) {
      super(props, context);
      this.measure = this.measure.bind(this);
      this.handleMeasure = this.handleMeasure.bind(this);
      this.state = {
        ...super.state,
        layout: {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          pageX: 0,
          pageY: 0,
        }
      };
    }

    handleMeasure(x, y, width, height, pageX, pageY) {
      this.setState({ layout: { x, y, height, width, pageX, pageY } });
    };

    measure() {
      UIManager.measure(findNodeHandle(this), this.handleMeasure);
    }

    componentDidMount() {
      requestAnimationFrame(this.measure);
      if (typeof super.componentDidMount === 'function') {
        super.componentDidMount();
      }
    }
  }

  return measuredComponent;
}
