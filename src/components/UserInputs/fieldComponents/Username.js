/**
 * 輸入名字的欄位, 當初 server side 定義叫 username, 這邊就直接沿用
 */
import { createFactory } from 'react';

import FieldComponent from './FieldComponent';
import { input } from '../../html5';

export default class Username extends FieldComponent {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.fieldName = '姓名';
  }

  onChange(ev) {
    const value = ev.target.value;
    return this.setState({
      value,
    });
  }

  onBlur() {
    const value = this.state.value.trim();
    return this.setState({
      value,
      isValid: value.length >= 2,
    });
  }

  get inputComponent() {
    return input({
      type: 'text',
      className: 'user-input--input-component username',
      name: 'username',
      autoComplete: 'name',
      inputMode: 'latin-name',
      placeholder: '請輸入名字',
      onChange: this.onChange,
      onBlur: this.onBlur,
      value: this.state.value,
    });
  }
}

export const username = createFactory(Username);
