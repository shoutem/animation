import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import {
  DropDownMenu,
  Screen,
  Divider,
} from '@shoutem/ui';

import Parallax from './Parallax';
import HeroHeader from './HeroHeader';
import FadeInOut from './FadeInOut';
import ZoomInOut from './ZoomInOut';
import ZoomInTouchable from './ZoomInTouchable';
import Rotate from './Rotate';
import SlideInOut from './SlideInOut';

const examples = {
  Parallax,
  HeroHeader,
  FadeInOut,
  ZoomInOut,
  ZoomInTouchable,
  Rotate,
  SlideInOut,
};

export class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedComponent: 'Parallax',
    };
  }

  render() {
    const { selectedComponent } = this.state;
    const SelectedComponent = examples[selectedComponent];
    return (
      <Screen>
        <Divider />
        <DropDownMenu
          styleName="horizontal"
          options={[{
            example: 'Parallax',
            component: 'Parallax',
          }, {
            example: 'Hero Header + ScrollDriver Animations',
            component: 'HeroHeader',
          }, {
            example: 'FadeIn + FadeOut (TimingDriver)',
            component: 'FadeInOut',
          }, {
            example: 'ZoomIn + ZoomOut (TimingDriver)',
            component: 'ZoomInOut',
          }, {
            example: 'ZoomIn (TouchableDriver)',
            component: 'ZoomInTouchable',
          }, {
            example: 'Rotate (TimingDriver)',
            component: 'Rotate',
          }, {
            example: 'SlideIn + SlideOut (TimingDriver)',
            component: 'SlideInOut',
          }]}
          onOptionSelected={(option) => this.setState({ selectedComponent: option.component })}
          titleProperty="example"
          valueProperty="component"
        />
        <SelectedComponent />
      </Screen>
    );
  }
}

