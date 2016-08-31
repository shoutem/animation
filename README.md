
# Animations
<hr />

When building an application, there is a need to create animations to enrich the user experience. Although React Native [provides a way](https://facebook.github.io/react-native/docs/animations.html) to implement arbitrary animations, it is not an easy task to do it, even for simple animations. That's where `@shoutem/animation` package comes in. Package contains **animation components** that should be wrapped around components that you want to get animated and **driver** that _controls_ the animations.

## Install

```bash
npm install --save @shoutem/animation
```

## Docs

All the documentation is available on the [Developer portal](http://shoutem.github.io/docs/ui-toolkit/animation/animations).


## Examples

To see animation components in action, check the application in the `examples` folder.

```bash
git clone git@github.com:shoutem/animation.git
cd examples/ShoutemAnimation
npm install
react-native run-ios
```

But feel the full power of this package with `connectAnimation` higher order component

Create your component

```javascript

import { connectAnimation } from '@shoutem/animation'

class MyComponent extends Component {
  render() {
  ...
  }
}

// connect it with connectAnimation and pass the list of animation functions

const AnimatedComponent = connectAnimation(MyComponent, {
  fadeOutAnimation(driver, { layout, animationOptions }) {
    return {
      opacity: driver.value.interpolate({
        inputRange: [0, layout.height],
        outputRange: [0, 1],
      }),
    };
  },
  solidifyAnimation(driver, { layout, options }) {
    return {
      backgroundColor: driver.value.interpolate({
        inputRange: [0, 100],
        outputRange: ['rgba(255, 255, 255, 0)', 'rgba(0, 170, 223, 1)'],
      }),
    };
  },
});

export {
AnimatedMyComponent as MyComponent,
}

```

Use it on some screen by passing it a driver


```javascript
...
class Screen extends Components {
  render() {
    const driver = new ScrollDriver();
    return (
      <ScrollView {...driver.scrollViewProps}>
        <MyComponent animationName="hero" driver={driver} />
      </ScrollView>
    );
  }
}
```

But could shorten this even more by using ScrollView from @shoutem/ui which handles and create drivers for you

```javascript
...
import { ScrollView } from '@shoutem/ui';

class Screen extends Components {
  render() {
    return (
      <ScrollView>
        <MyComponent animationName="hero" />
      </ScrollView>
    );
  }
}
```

## UI Toolkit

Shoutem UI is a part of the Shoutem UI Toolkit that enables you to build professionally looking React Native apps with ease.  

It consists of three libraries:

- [@shoutem/ui](https://github.com/shoutem/ui): beautiful and customizable UI components
- [@shoutem/theme](https://github.com/shoutem/theme): “CSS-way” of styling entire app 
- [@shoutem/animation](https://github.com/shoutem/animation): declarative way of applying ready-made  animations

## License

[The BSD License](https://opensource.org/licenses/BSD-3-Clause)

Copyright (c) 2016-present, [Shoutem](http://shoutem.github.io)
