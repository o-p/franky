/**
 * 共用的欄位, 透過 instance properties 調整效果
 */
import { Component, PropTypes, createElement } from 'react';

import { div, label } from '../../html5';
import SvgOk from '../../Svg/Ok';
import SvgClose from '../../Svg/Close';

export default class FieldComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      isValid: null, // 一開始不出現 icon
    };
  }

  componentDidUpdate(prevProp, prevState) {
    const { isValid, value } = this.state;

    if (prevState.isValid !== isValid) this.props.onValidStateChange(isValid);
    if (prevState.value !== value) this.props.onValueChange(value);
  }

  get validElement() {
    const { isValid } = this.state;
    switch (isValid) {
      case true:
        return createElement(SvgOk, { className: 'valid-icon valid' });
      case false:
        return createElement(SvgClose, { className: 'valid-icon invalid' });
      default:
        return null;
    }
  }

  render() {
    const fieldName = div({
      className: 'user-inputs--label',
    }, this.fieldName);

    const fieldInput = div({
      className: 'user-inputs--input-wrapper',
    },
      this.inputComponent,
      this.validElement
    );

    return label({
      className: this.state.isValid === false // 這邊初始是 null, 但不顯示 error
          ? 'user-inputs--row with-error'
          : 'user-inputs--row',
    },
      fieldName,
      fieldInput,
    );
  }
}

FieldComponent.propTypes = {
  onValidStateChange: PropTypes.func,
  onValueChange: PropTypes.func,
};

FieldComponent.contextTypes = {
  theme: PropTypes.object,
};
