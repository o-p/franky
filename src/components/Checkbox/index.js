import './checkbox.scss';
import { createElement, PropTypes, Component } from 'react';
import SvgCheckIcon from './SvgCheckIcon';

const propTypes = {
  borderColor: PropTypes.string,
  checked: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.number,
};
const defaultProps = {
  checked: false,
};

export default class Checkbox extends Component {
  static ClassNames = {
    Container: 'checkbox',
    ContainerChecked: 'checkbox checked',
  };

  componentWillMount() {
    const { borderColor, size } = this.props;
    this.Styles = {
      Container: {
        width: size,
        height: size,
        borderColor,
      },
    };
  }

  render() {
    const { checked, color, size } = this.props;

    return createElement('div', {
      className: checked ? Checkbox.ClassNames.ContainerChecked : Checkbox.ClassNames.Container,
      style: this.Styles.Container,
    }, createElement(SvgCheckIcon, { show: checked, fillColor: color, size }));
  }
}
Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;
