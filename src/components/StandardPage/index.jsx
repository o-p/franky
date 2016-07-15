import './standard-page.scss';
import React, { createElement, PropTypes, Component } from 'react';
import Header from '../Header';

export default class StandardPage extends Component {
  static ClassNames = {
    Root: 'standard-page',
    InnerWrapper: 'standard-page-inner-wrapper',
  };

  static propTypes = {
    children: PropTypes.node,
  };

  static Keys = {
    InnerWrapper: 'wrapper',
    Header: 'header',
  };

  static Refs = {
    InnerWrapper: 'wrapper',
  };

  constructor(props) {
    super(props);
    this.onContentScroll = this.onContentScroll.bind(this);

    this.state = {
      headerShadow: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(
      nextProps.children === this.props.children &&
      nextState.headerShadow === this.state.headerShadow
    );
  }

  onContentScroll() {
    const wrapper = this.refs[StandardPage.Refs.InnerWrapper];
    const top = wrapper.scrollTop || 0;
    const headerShadow = top > 0;

    if (headerShadow !== this.state.headerShadow) {
      this.setState({ headerShadow });
    }
  }

  render() {
    const { children } = this.props;
    const { headerShadow } = this.state;

    const innerWrapper = createElement('div', {
      className: StandardPage.ClassNames.InnerWrapper,
      key: StandardPage.Keys.InnerWrapper,
      ref: StandardPage.Refs.InnerWrapper,
      onScroll: this.onContentScroll,
    }, children);

    return createElement('div', {
      className: StandardPage.ClassNames.Root,
    }, [
      createElement(Header, { hasShadow: headerShadow, key: StandardPage.Keys.Header }),
      innerWrapper,
    ]);
  }
}
