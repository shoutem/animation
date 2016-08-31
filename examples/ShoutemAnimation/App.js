import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import {
  NavigationBar,
  DropDownMenu,
  Screen,
} from '@shoutem/ui';

import Parallax from './Parallax';
import HeroHeader from './HeroHeader';
import FadeInOut from './FadeInOut';
import ZoomInOut from './ZoomInOut';

const examples = {
  Parallax,
  HeroHeader,
  FadeInOut,
  ZoomInOut,
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
        <DropDownMenu
          styleName="horizontal"
          options={[{
            example: 'Parallax',
            component: 'Parallax',
          }, {
            example: 'Hero Header + ScrollDriver Animations',
            component: 'HeroHeader',
          }, {
            example: 'FadeIn + FadeOut (TimerDriver)',
            component: 'FadeInOut',
          }, {
            example: 'ZoomIn + ZoomOut (TimerDriver)',
            component: 'ZoomInOut',
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

