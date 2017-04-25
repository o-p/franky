/**
 * 輸入年紀的欄位
 * @see https://en.wikipedia.org/wiki/Oldest_people
 * 目前活著最老: 117 @2017
 */
import { createFactory } from 'react';

import FieldComponent from './FieldComponent';
import { input } from '../../html5';

// import regexp from '../../../helpers/regexp/email';

export default class Age extends FieldComponent {
  constructor(props) {
    super(props);

    this.onChange = ev => this.setState({ value: ev.target.value });
    this.onBlur = this.onBlur.bind(this);
    this.fieldName = '年齡';
  }

  onBlur() {
    const value = this.state.value.trim();
    const age = parseInt(value, 10);
    return this.setState({
      value,
      isValid: age >= 0 && age <= 120,
    });
  }

  get inputComponent() {
    return input({
      type: 'text',
      className: 'user-input--input-component age',
      name: 'age',
      inputMode: 'numeric',
      placeholder: '請確認您的年紀符合活動規範',
      onChange: this.onChange,
      onBlur: this.onBlur,
      value: this.state.value,
    });
  }
}

export const age = createFactory(Age);
