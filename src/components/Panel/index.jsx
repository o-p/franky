import './panel.scss';
import React, { createElement, PropTypes, Component } from 'react';

export default class Panel extends Component {
  static propTypes = {
    title: PropTypes.node,
    children: PropTypes.node,
  };

  static ClassNames = {
    Root: 'panel',
    PanelTitle: 'panel-title',
    PanelBody: 'panel-body',
  };

  get title() {
    const { title } = this.props;
    return createElement('div', {
      key: Panel.ClassNames.PanelTitle,
      className: Panel.ClassNames.PanelTitle,
    }, title);
  }

  render() {
    const { children } = this.props;
    const body = createElement('div', {
      key: Panel.ClassNames.PanelBody,
      className: Panel.ClassNames.PanelBody,
    }, children);

    return createElement('div', {
      className: Panel.ClassNames.Root,
    }, [this.title, body]);
  }
}
