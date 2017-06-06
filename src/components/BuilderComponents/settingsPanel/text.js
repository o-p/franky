import { createElement, createFactory } from 'react';
import TextField from 'material-ui/TextField';
import Base from './Base';

const filterEnter = callback => event => event.which === 13 && callback(event);

export default class Text extends Base {

  constructor(props) {
    super(props);

    this.onValueChange = this.onValueChange.bind(this);
    this.onConfirm = this.onConfirm.bind(this);

    this.onBlur = this.onConfirm;

    this.onFocus = (ev) => ev.target.select();

    this.onEnterKeyDown = filterEnter(this.onConfirm);
  }

  onValueChange(ev, value) {
    this.currentValue = value;
  }

  onConfirm() {
    this.value = this.currentValue;
  }

  render() {
    const { text, hint, path } = this.props;

    return createElement(TextField, {
      className: `settings-panel--text-field field--${path.join('-')}`, // 'text-field ',
      defaultValue: this.defaultValue,
      floatingLabelText: text,
      hintText: hint,
      onChange: this.onValueChange,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onKeyDown: this.onEnterKeyDown,
    });
  }
}

export const text = createFactory(Text);
