import './panel.scss';
import React, { createElement, PropTypes, Component } from 'react';

export default class Panel extends Component {
  static propTypes = {
    title: PropTypes.node,
    children: PropTypes.node,
    defaultToggled: PropTypes.bool,
  };

  static defaultProps = {
    defaultToggled: true,
  };

  static ClassNames = {
    Root: 'panel',
    PanelTitle: 'panel-title',
    PanelBody: 'panel-body',
  };

  constructor(props) {
    super(props);
    this.state = {
      expand: props.defaultToggled,
    };
    this.togglePanelBody = () => this.setState({
      expand: !this.state.expand,
    });
  }

  get title() {
    const { title } = this.props;

    return createElement('div', {
      key: Panel.ClassNames.PanelTitle,
      className: Panel.ClassNames.PanelTitle,
      onClick: this.togglePanelBody,
    }, title);
  }

  render() {
    const { children } = this.props;
    const body = this.state.expand ? createElement('div', {
      key: Panel.ClassNames.PanelBody,
      className: Panel.ClassNames.PanelBody,
    }, children) : null;

    return createElement('div', {
      className: Panel.ClassNames.Root,
    },
      this.title,
      body
    );
  }
}
