import { createElement, PropTypes, Component } from 'react';
import joinClasses from 'fbjs/lib/joinClasses';

import { label, span, div } from '../html5';
import RadioButton from '../RadioButton';

const propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  primaryColor: PropTypes.string,
  defaultValue: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};
const defaultProps = {
  name: '',
};
export default class RadioGroup extends Component {
  static ClassNames = {
    ItemWrapper: 'radio-group-item-wrapper',
    ItemText: 'radio-group-item-text',
  };
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      value: props.defaultValue,
    };
  }

  onChange(ev, value) {
    if (value !== this.state.value) {
      this.setState({
        value,
      });

      return this.props.onChange(value);
    }
    return false;
  }

  get radioButtons() {
    const { options, color, primaryColor } = this.props;

    return options.map(opt => {
      const { text, value } = opt;

      return label({
        key: value,
        className: `${RadioGroup.ClassNames.ItemWrapper} option-${value}`,
        onClick: (ev) => this.onChange(ev, value),
        style: { color },
      },
        createElement(RadioButton, {
          checked: value === this.state.value,
          borderColor: color,
          color: primaryColor,
        }),
        span({
          className: RadioGroup.ClassNames.ItemText,
        }, text),
      );
    });
  }

  render() {
    const { className, name } = this.props;
    return div({
      className: joinClasses(
        'radio-group',
        name ? `items-${name}` : '',
        className),
    }, this.radioButtons);
  }

}

RadioGroup.propTypes = propTypes;
RadioGroup.defaultProps = defaultProps;
