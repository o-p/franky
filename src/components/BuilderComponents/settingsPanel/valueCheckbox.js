import { createElement, createFactory } from 'react';
import Checkbox from 'material-ui/Checkbox';
import Base from './Base';

export default class ValueCheckbox extends Base {

  constructor(props) {
    super(props);

    this.onCheck = this.onCheck.bind(this);
  }

  onCheck(ev, toggled) {
    const { on, off } = this.props;
    this.value = toggled ? on : off;
  }

  render() {
    const { path, on } = this.props;

    return createElement(Checkbox, { // 目前應用都不需要文字, 所以先把 label prop 拿掉
      defaultChecked: this.value === on,
      onCheck: this.onCheck,
      style: {
        display: 'inline-block',
        width: '2em',
      },
      className: `settings-panel--value-checkbox field--${path.join('-')}`,
    });
  }
}

export const valueCheckbox = createFactory(ValueCheckbox);
