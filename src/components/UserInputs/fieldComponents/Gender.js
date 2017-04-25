/**
 * // ☑ 我同意 隱私權條款
 */
import { createElement, createFactory, PropTypes } from 'react';
import FieldComponent from './FieldComponent';

import RadioGroup from '../../RadioGroup';
import { div } from '../../html5';

export default class Gender extends FieldComponent {
  constructor(props) {
    super(props);

    this.onChange = value => this.setState({ value, isValid: true });
  }

  render() {
    const fieldName = div({
      className: 'user-inputs--label',
    }, '性別');

    const wrapper = div({
      className: 'user-inputs--input-wrapper',
    },
      createElement(RadioGroup, {
        color: this.context.theme.contentText,
        primaryColor: this.context.theme.contentHighlight,
        defaultValue: this.state.value,
        options: [{ text: '男', value: '1' }, { text: '女', value: '2' }],
        name: 'gender',
        className: 'user-inputs--radio-group',
        onChange: this.onChange,
      })
    );

    return div({
      className: 'user-inputs--row',
    },
      fieldName,
      wrapper
    );
  }
}

// Gender.propTypes = {
//   onValidStateChange: PropTypes.func,
//   onValueChange: PropTypes.func,
// };
Gender.contextTypes = {
  theme: PropTypes.object,
};

export const gender = createFactory(Gender);
