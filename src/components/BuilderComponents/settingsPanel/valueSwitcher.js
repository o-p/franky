import { createElement, createFactory } from 'react';
import Toggle from 'material-ui/Toggle';
import Base from './Base';

export default class ValueSwitcher extends Base {

  constructor(props) {
    super(props);

    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(ev, toggled) {
    const { on, off } = this.props;
    this.value = toggled ? on : off;
  }

  render() {
    const { text, path, on } = this.props;

    return createElement(Toggle, {
      defaultToggled: this.value === on,
      label: text,
      onToggle: this.onToggle,
      className: `settings-panel--value-switcher field--${path.join('-')}`,
    });
  }
}

export const valueSwitcher = createFactory(ValueSwitcher);
