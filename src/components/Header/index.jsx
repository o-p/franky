import './header.scss';
import React, { createElement, PropTypes, Component } from 'react';
import Logo from '../LogoKKBOX';

export default class Header extends Component {
  static ClassNames = {
    RootDefault: 'header',
    RootWithShadow: 'header drop-shadow',
  };

  static propTypes = {
    hasShadow: PropTypes.bool,
  };

  static Logo = createElement(Logo, { color: '#FFFFFF', key: 'logo', className: 'logo' });

  render() {
    const { hasShadow } = this.props;

    return createElement('div', {
      className: hasShadow ? Header.ClassNames.RootWithShadow : Header.ClassNames.RootDefault,
    }, Header.Logo);
  }
}
