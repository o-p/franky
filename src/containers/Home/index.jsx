import './styles.scss';

// import injectTapEventPlugin from 'react-tap-event-plugin';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';
// import FlatButton from 'material-ui/FlatButton';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FullPage from '../../components/FullPage';
import Logo from '../../components/LogoKKBOX';
import React, { createElement, Component } from 'react';

import pathBackground from './home-background.jpg';
import pathLandingText from './text.svg';

// injectTapEventPlugin();

export default class Home extends Component {
  // static Theme = getMuiTheme({
  //   userAgent: navigator && navigator.userAgent || 'false',
  // });

  static ClassNames = {
    ButtonsWrapper: 'buttons',
    ContentWrapper: 'contents',
    FilterImage: 'filter-image',
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
      action: './full',
      id: Home.Ids.FullLayout,
      method: 'post',
      name: Home.Ids.FullLayout,
      target: '_self',
    }),
    RectangleLayout: createElement('form', {
      key: 'rect-layout-form',
      action: './rect',
      id: Home.Ids.RectangleLayout,
      method: 'post',
      name: Home.Ids.RectangleLayout,
      target: '_self',
    }),
  };

  static Pathes = {
    BackgroundImage: pathBackground,
    LandingText: pathLandingText,
  };

  static Texts = {
    Landing: createElement('img', {
      className: Home.ClassNames.LandingText,
      key: Home.Keys.LandingText,
      src: Home.Pathes.LandingText,
      alt: 'It all starts with ',
    }),
  };

  constructor(props) {
    super(props);

    this.state = {};
    this.onBackgroundLoaded = () => this.setState({
      containerClassName: 'loaded',
    });
  }

  componentWillMount() {
    // set className for animation.
    if (ExecutionEnvironment.canUseDOM) {
      const backgroundImage = new Image();
      backgroundImage.onload = this.onBackgroundLoaded;
      backgroundImage.src = Home.Pathes.BackgroundImage;
    }

    this.filterImage = createElement('div', {
      className: Home.ClassNames.FilterImage,
      key: Home.Keys.FilterImage,
    });
  }

  get buttons() {
    // const buttonFullLayout = createElement(FlatButton, {
    const buttonFullLayout = createElement('button', {
      key: 'full',
      // backgroundColor: '#FFF',
      className: 'button full-layout',
      // hoverColor: '#00ACCC',
      // rippleColor: '#006C88',
      // style: {
      //   height: 60,
      //   lineHeight: '60px',
      //   borderRadius: 30,
      //   color: '#939393',
      // },
      type: 'submit',
      form: Home.Ids.FullLayout,
    }, '滿版');

    // const buttonRectLayout = createElement(FlatButton, {
    const buttonRectLayout = createElement('button', {
      key: 'rect',
      // backgroundColor: '#FFF',
      className: 'button rect-layout',
      // hoverColor: '#00ACCC',
      // rippleColor: '#006C88',
      // style: {
      //   height: 60,
      //   lineHeight: '60px',
      //   borderRadius: 30,
      //   color: '#939393',
      // },
      type: 'submit',
      form: Home.Ids.RectangleLayout,
    }, '非滿版');

    const buttonWrapper = createElement('div', {
      className: Home.ClassNames.ButtonsWrapper,
    }, [
      buttonFullLayout,
      buttonRectLayout,
    ]);

    // return createElement(MuiThemeProvider, {
    return createElement('div', {
      key: Home.Keys.ButtonsWrapper,
    }, buttonWrapper);
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

