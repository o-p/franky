/**
 * // ☑ 我同意 隱私權條款
 */
import { createElement, createFactory, Component, PropTypes } from 'react';

import Checkbox from '../../Checkbox';
import { div, label, span } from '../../html5';

export default class Policy extends Component {

  constructor(props) {
    super(props);
    this.state = { checked: false };
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.showPolicyContent = (ev) => {
      if (ev && typeof ev.stopPropagation === 'function') ev.stopPropagation();
      this.context.toggleLightbox();
    };
  }

  componentWillMount() {
    const { theme, styles } = this.context;

    const link = span({
      className: 'privacy-link',
      onClick: this.showPolicyContent,
      style: {
        color: theme.contentHighlight,
        borderBottom: `1px solid ${theme.contentHighlight}`,
      },
    }, '隱私權條款');

    const text = span({ className: 'privacy-text' }, '我同意');

    this.text = label({
      className: 'privacy-desc',
      style: styles.defaultText,
    }, text, link);
  }

  toggleCheckbox() {
    const checked = !this.state.checked;
    this.props.onValidStateChange(checked); // checked = valid

    this.setState({ checked });
  }

  render() {
    const { theme } = this.context;
    const { checked } = this.state;

    const checkbox = createElement(Checkbox, {
      checked,
      borderColor: theme.contentText,
      color: theme.contentHighlight,
    });

    return div({
      className: 'user-inputs--row',
    },
      div({
        className: 'user-inputs-privacy',
        onClick: this.toggleCheckbox,
      }, checkbox, this.text)
    );
  }
}

Policy.propTypes = {
  onValidStateChange: PropTypes.func,
  onValueChange: PropTypes.func,
};
Policy.contextTypes = {
  toggleLightbox: PropTypes.func,
  theme: PropTypes.object,
  styles: PropTypes.object,
};

export const policy = createFactory(Policy);
