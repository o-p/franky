import { createElement, createFactory, Component, PropTypes } from 'react';

import './settings-panel.scss';
import Panel from '../../Panel';
import { div, span } from '../../html5';

import { fileUploader } from './fileUploader';
import { subtitle } from './subtitle';
import { text } from './text';
import { valueCheckbox } from './valueCheckbox';
import { valueSwitcher } from './valueSwitcher';


const components = {
  fileUploader,
  subtitle,
  text,
  valueCheckbox,
  valueSwitcher,
};

class SettingsPanel extends Component {
  constructor(props) {
    super(props);
    const { title } = props;
    this.title = div(
      null,
      span({ className: 'zh' }, title.zh),
      span({ className: 'en' }, title.en)
    );
  }

  get contents() {
    const { contents } = this.props;
    return contents.map((ct) => {
      const component = components[ct.type];
      if (component instanceof Function) {
        return component(ct);
      }
      return null;
    });
  }
  render() {
    return createElement(Panel, {
      title: this.title,
    }, ...this.contents);
  }
}

SettingsPanel.propTypes = {
  contents: PropTypes.array,
};

export const settingsPanel = createFactory(SettingsPanel);
