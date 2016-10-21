import './styles.scss';

import React, { createElement, Component } from 'react';

import pathPortImage from './background-port.jpg';
import pathLandText from './text-land.svg';
import pathPortText from './text-port.svg';
import pathGoPremiumLand from './premium-land.svg';
import pathGoPremiumPort from './premium-port.svg';
import pathButtonPlayItLand from './button-playit-land.svg';
import pathButtonPlayItPort from './button-playit-port.svg';
import pathButtonPlaylistLand from './button-playlist-land.svg';
import pathButtonPlaylistPort from './button-playlist-port.svg';
import pathButtonExternalLand from './button-external-land.svg';
import pathButtonExternalPort from './button-external-port.svg';

import WelcomePage from '../WelcomePage';

export default class WelcomePageRect extends Component {
  componentWillMount() {
    this.pathes = {
      pathPortImage,
      pathLandText,
      pathPortText,
      pathGoPremiumLand,
      pathGoPremiumPort,
      pathButtonPlayItLand,
      pathButtonPlayItPort,
      pathButtonPlaylistLand,
      pathButtonPlaylistPort,
      pathButtonExternalLand,
      pathButtonExternalPort,
    };
    this.portImage = createElement('img', {
      key: 'image-port',
      src: pathPortImage,
      className: 'image-port',
      alt: 'Sponsored Premium',
    });
  }

  render() {
    return createElement(WelcomePage, {
      pathes: this.pathes,
      elemBeforeContent: this.portImage,
    });
  }
}

