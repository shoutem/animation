import React, { Component } from 'react';
import { DropDownMenu, Screen, Divider } from '@shoutem/ui';
import FadeInOut from './FadeInOut';
import HeroHeader from './HeroHeader';
import Parallax from './Parallax';
import Rotate from './Rotate';
import SlideInOut from './SlideInOut';
import ZoomInOut from './ZoomInOut';
import ZoomInTouchable from './ZoomInTouchable';

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

    this.components = [
      {
        example: 'Parallax',
        component: 'Parallax',
      },
      {
        example: 'Hero Header + ScrollDriver Animations',
        component: 'HeroHeader',
      },
      {
        example: 'FadeIn + FadeOut (TimingDriver)',
        component: 'FadeInOut',
      },
      {
        example: 'ZoomIn + ZoomOut (TimingDriver)',
        component: 'ZoomInOut',
      },
      {
        example: 'ZoomIn (TouchableDriver)',
        component: 'ZoomInTouchable',
      },
      {
        example: 'Rotate (TimingDriver)',
        component: 'Rotate',
      },
      {
        example: 'SlideIn + SlideOut (TimingDriver)',
        component: 'SlideInOut',
      },
    ];

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
          onOptionSelected={option =>
            this.setState({ selectedComponent: option })
          }
          titleProperty="example"
          valueProperty="component"
        />
        <SelectedComponent />
      </Screen>
    );
  }
}
