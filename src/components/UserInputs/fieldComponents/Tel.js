/**
 * 輸入電話的欄位, 名稱沿用 server side
 */
import { createFactory } from 'react';

import FieldComponent from './FieldComponent';
import { input } from '../../html5';

import regexp from '../../../helpers/regexp/tel';

export default class Tel extends FieldComponent {
  constructor(props) {
    super(props);

    this.onChange = ev => this.setState({ value: ev.target.value });
    this.onBlur = this.onBlur.bind(this);
    this.fieldName = '電話';
  }

  onChange(ev) {
    return this.setState({ value: ev.target.value });
  }

  onBlur() {
    const value = this.state.value.trim();

    return this.setState({
      value,
      isValid: regexp.test(value),
    });
  }

  get inputComponent() {
    return input({
      autoComplete: 'tel',
      className: 'user-input--input-component input-tel',
      inputMode: 'tel',
      name: 'tel',
      onChange: this.onChange,
      onBlur: this.onBlur,
      placeholder: '請輸入連絡電話',
      type: 'tel',
      value: this.state.value,
    });
  }
}

export const tel = createFactory(Tel);
