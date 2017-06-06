import './styles.scss';

import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';
import FullPage from '../../components/FullPage';
import Logo from '../../components/LogoKKBOX';
import React, { createElement, Component, createFactory } from 'react';

import Config from 'config/home.json'; // eslint-disable-line import/no-unresolved
import pathBackground from './home-background.jpg';
import pathLandingText from './text.svg';

const form = createFactory('form');
const button = createFactory('button');
const input = createFactory('input');

export default class Home extends Component {
  static Ids = {
    FullLayout: 'full-layout',
    RectangleLayout: 'rect-layout',
    CustomQuiz: 'custom-quiz',
  };

  static Forms = [
    form({
      key: 'full-layout-form',
      action: Config.API_FULL_LAYOUT.path,
      id: Home.Ids.FullLayout,
      method: 'post',
      name: Home.Ids.FullLayout,
      target: '_self',
    }, input({
      type: 'hidden',
      name: Config.API_FULL_LAYOUT.key,
      value: Config.API_FULL_LAYOUT.value,
    })),
    form({
      key: 'rect-layout-form',
      action: Config.API_RECT_LAYOUT.path,
      id: Home.Ids.RectangleLayout,
      method: 'post',
      name: Home.Ids.RectangleLayout,
      target: '_self',
    }, input({
      type: 'hidden',
      name: Config.API_RECT_LAYOUT.key,
      value: Config.API_RECT_LAYOUT.value,
    })),
    form({
      key: 'custom-quiz-form',
      action: Config.API_CUSTOM_QUIZ.path,
      id: Home.Ids.CustomQuiz,
      method: 'post',
      name: Home.Ids.CustomQuiz,
      target: '_self',
    }, input({
      type: 'hidden',
      name: Config.API_CUSTOM_QUIZ.key,
      value: Config.API_CUSTOM_QUIZ.value,
    })),
  ];

  static Pathes = {
    BackgroundImage: pathBackground,
    LandingText: pathLandingText,
  };

  static Texts = {
    Landing: createElement('img', {
      alt: 'It all starts with a stunnung welcome page. Create your, It\'s easy and free.',
      className: 'landing-text',
      src: Home.Pathes.LandingText,
    }),
  };

  constructor(props) {
    super(props);

    this.state = {};
    this.onBackgroundLoaded = () => this.setState({
      containerClassName: 'loaded',
    });
    this.onBackgroundFailed = () => {
      this.setState({
        containerClassName: 'failed',
      });
    };
  }

  componentWillMount() {
    // set className for animation.
    if (ExecutionEnvironment.canUseDOM) {
      const backgroundImage = new Image();
      backgroundImage.onload = this.onBackgroundLoaded;
      backgroundImage.onerror = this.onBackgroundFailed;
      backgroundImage.src = Home.Pathes.BackgroundImage;
    }

    this.filterImage = createElement('div', {
      className: 'filter-image',
    });

    const hoverEffectLayer = createElement.bind(this, 'div', {
      className: 'hover-effect',
    });

    // buttons:
    const btns = [{
      id: Home.Ids.FullLayout,
      text: '滿版',
    }, {
      id: Home.Ids.RectangleLayout,
      text: '非滿版',
    }, {
      id: Home.Ids.CustomQuiz,
      text: '客製問卷',
    }].map(config => button({
      key: config.id,
      form: config.id,
      className: 'button',
      type: 'submit',
    }, hoverEffectLayer(config.text)));

    this.buttons = createElement('div', {
      className: 'buttons',
    }, btns);
  }

  get contents() {
    return createElement('div', {
      className: 'contents',
    },
      Home.Texts.Landing,
      this.buttons,
    );
  }

  render() {
    return createElement(FullPage, {
      className: this.state.containerClassName,
    },
      createElement(Logo, { className: 'logo' }),
      this.contents,
      this.filterImage,
      ...Home.Forms,
    );
  }
}

