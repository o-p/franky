import './styles.scss';

import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';
import FullPage from '../../components/FullPage';
import Logo from '../../components/LogoKKBOX';
import React, { createElement, Component } from 'react';

import Config from 'config/home.json'; // eslint-disable-line import/no-unresolved
import pathBackground from './home-background.jpg';
import pathLandingText from './text.svg';

export default class Home extends Component {
  static ClassNames = {
    ButtonFull: 'button full-layout',
    ButtonRect: 'button rect-layout',
    ButtonsWrapper: 'buttons',
    ContentWrapper: 'contents',
    FilterImage: 'filter-image',
    HoverEffectLayer: 'hover-effect',
    LandingText: 'landing-text',
    Logo: 'logo',
  };

  static Keys = Object.assign({}, Home.ClassNames, {
    // to custom keys if necessary
  });

  static Ids = {
    FullLayout: 'full-layout',
    RectangleLayout: 'rect-layout',
  };

  static Forms = {
    FullLayout: createElement('form', {
      key: 'full-layout-form',
      action: Config.API_FULL_LAYOUT.path,
      id: Home.Ids.FullLayout,
      method: 'post',
      name: Home.Ids.FullLayout,
      target: '_self',
    }, createElement('input', {
      type: 'hidden',
      name: Config.API_FULL_LAYOUT.key,
      value: Config.API_FULL_LAYOUT.value,
    })),
    RectangleLayout: createElement('form', {
      key: 'rect-layout-form',
      action: Config.API_RECT_LAYOUT.path,
      id: Home.Ids.RectangleLayout,
      method: 'post',
      name: Home.Ids.RectangleLayout,
      target: '_self',
    }, createElement('input', {
      type: 'hidden',
      name: Config.API_RECT_LAYOUT.key,
      value: Config.API_RECT_LAYOUT.value,
    })),
  };

  static Pathes = {
    BackgroundImage: pathBackground,
    LandingText: pathLandingText,
  };

  static Texts = {
    Landing: createElement('img', {
      key: Home.Keys.LandingText,
      alt: 'It all starts with a stunnung welcome page. Create your, It\'s easy and free.',
      className: Home.ClassNames.LandingText,
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
      className: Home.ClassNames.FilterImage,
      key: Home.Keys.FilterImage,
    });

    const hoverEffectLayer = createElement.bind(this, 'div', {
      className: Home.ClassNames.HoverEffectLayer,
    });

    // buttons:
    const buttonFullLayout = createElement('button', {
      key: 'full',
      className: Home.ClassNames.ButtonFull,
      form: Home.Ids.FullLayout,
      type: 'submit',
    }, hoverEffectLayer('滿版'));

    const buttonRectLayout = createElement('button', {
      key: 'rect',
      className: Home.ClassNames.ButtonRect,
      form: Home.Ids.RectangleLayout,
      type: 'submit',
    }, hoverEffectLayer('非滿版'));

    this.buttons = createElement('div', {
      key: Home.Keys.ButtonsWrapper,
      className: Home.ClassNames.ButtonsWrapper,
    }, [
      buttonFullLayout,
      buttonRectLayout,
    ]);
  }

  get contents() {
    return createElement('div', {
      className: Home.ClassNames.ContentWrapper,
      key: 'contents',
    }, [
      Home.Texts.Landing,
      this.buttons,
    ]);
  }

  render() {
    return createElement(FullPage, {
      className: this.state.containerClassName,
    }, [
      createElement(Logo, { key: 'logo', className: Home.ClassNames.Logo }),
      this.contents,
      this.filterImage,
      Home.Forms.FullLayout,
      Home.Forms.RectangleLayout,
    ]);
  }
}

