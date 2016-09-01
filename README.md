
# Animations
<hr />

When building an application, there is a need to create animations to enrich the user experience. Although React Native [provides a way](https://facebook.github.io/react-native/docs/animations.html) to implement arbitrary animations, it is not an easy task to do it, even for simple animations. That's where `@shoutem/animation` package comes in. Package contains **animation components** that should be wrapped around components that you want to get animated and **driver** that controls the animations.

## Install

```bash
$ npm install --save @shoutem/animation
```

## Docs

All the documentation is available on the [Developer portal](http://shoutem.github.io/docs/ui-toolkit/animation/introduction).


## Examples

To see animation components in action, start by creating new React Native project:

```bash
$ react-native init HelloWorld
```

Locate to project and install `@shoutem/animation`:

```bash
$ cd HelloWorld
$ npm install --save @shoutem/animation
```

Now, simply copy the following to your `index.ios.js` or `index.android.js` file of React Native project:

```javascript
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';

import {
  FadeOut,
  FadeIn,
  ScrollDriver,
} from '@shoutem/animation';

class HelloWorld extends Component {
  render() {
    // create new ScrollDriver that will animate animations when passing
    // through scroll positions in input range
    const driver = new ScrollDriver();
    return (
      <ScrollView {...driver.scrollViewProps}>
        <View style={style.container}>
          {/* This will fade out on scroll position 100 */}
          <FadeOut driver={driver} inputRange={[50, 100]}>
            <Text>Good Bye</Text>
          </FadeOut>
          {/* This will fade in on scroll position 150 */}
          <FadeIn driver={driver} inputRange={[50, 150]}>
            <Text>Hello</Text>
          </FadeIn>
        </View>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    height: 900,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

AppRegistry.registerComponent('HelloWorld', () => HelloWorld);
```

Finally, run the app!

```bash
$ react-native run-ios
$ react-native run-android
```

For more complex animations, run application from `examples` folder:

```bash
$ git clone git@github.com:shoutem/animation.git
$ cd animation/examples/ShoutemAnimation/
$ npm install
$ react-native run-ios
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
