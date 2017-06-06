/**
 * 輸入名字的欄位, 當初 server side 定義叫 username, 這邊就直接沿用
 */
import { createFactory } from 'react';

import FieldComponent from './FieldComponent';
import { input } from '../../html5';

import regexp from '../../../helpers/regexp/email';

export default class Email extends FieldComponent {
  constructor(props) {
    super(props);

    this.onChange = ev => this.setState({ value: ev.target.value });
    this.onBlur = this.onBlur.bind(this);
    this.fieldName = 'Email';
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
      type: 'email',
      className: 'user-input--input-component email',
      name: 'email',
      autoComplete: 'email',
      inputMode: 'email',
      placeholder: '電子郵件信箱',
      onChange: this.onChange,
      onBlur: this.onBlur,
      value: this.state.value,
    });
  }
}

export const email = createFactory(Email);
