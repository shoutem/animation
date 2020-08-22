import React, { Component } from 'react';

import { DropDownMenu, Screen, Divider } from '@shoutem/ui';

import Parallax from './Parallax';
import { HeroHeaderExample as HeroHeader } from './HeroHeader';
import { FadeInOutExample as FadeInOut } from './FadeInOut';
import { ZoomInOutExample as ZoomInOut } from './ZoomInOut';
import { ZoomInTouchableExample as ZoomInTouchable } from './ZoomInTouchable';
import { RotateExample as Rotate } from './Rotate';
import { SlideInOutExample as SlideInOut } from './SlideInOut';

const examples = {
  Parallax,
  HeroHeader,
  FadeInOut,
  ZoomInOut,
  ZoomInTouchable,
  Rotate,
  SlideInOut,
};

export default class AnimationExamples extends Component {
  constructor() {
    super();

    this.components = [{
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
    }];

    this.state = {
      selectedComponent: this.components[0],
    };
  }

  render() {
    const { selectedComponent } = this.state;

    const SelectedComponent = examples[selectedComponent.component];

    return (
      <Screen>
        <Divider />
        <DropDownMenu
          styleName="horizontal"
          options={this.components}
          selectedOption={selectedComponent}
          onOptionSelected={option => this.setState({ selectedComponent: option })}
          titleProperty="example"
          valueProperty="component"
        />

        <SelectedComponent />
      </Screen>
    );
  }
}
