import './radio-button.scss';
import React, { createElement, PropTypes, Component } from 'react';
import joinClasses from 'fbjs/lib/joinClasses';

const contextTypes = {
  theme: PropTypes.object,
};
const propTypes = {
  borderColor: PropTypes.string,
  checked: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number,
};
const defaultProps = {
  checked: false,
  size: 16,
};

export default class RadioButton extends Component {
  static ClassNames = {
    ContainerDefault: 'radio-button',
    ContainerChecked: 'radio-button checked',
    Dot: 'radio-button-dot',
  };

  componentWillMount() {
    const { color, borderColor, size } = this.props;
    this.Styles = {
      Container: {
        width: size,
        height: size,
        borderColor,
      },
      Dot: {
        backgroundColor: color,
      },
    };
  }

  render() {
    const { checked, className } = this.props;

    const buttonClass = checked ?
        RadioButton.ClassNames.ContainerChecked :
        RadioButton.ClassNames.ContainerDefault;

    return createElement('div', {
      className: joinClasses(buttonClass, className),
      style: this.Styles.Container,
    }, createElement('div', {
      className: RadioButton.ClassNames.Dot,
      style: this.Styles.Dot,
    }, ' '));
  }
}
RadioButton.contextTypes = contextTypes;
RadioButton.propTypes = propTypes;
RadioButton.defaultProps = defaultProps;
