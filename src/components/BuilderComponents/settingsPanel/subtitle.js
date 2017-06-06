import { createFactory } from 'react';

import { div, span } from '../../html5';

export default function SubTitle(props) {
  return div({
    className: 'settings-panel--sub-title',
  }, span({
    className: 'text',
  }, props.text));
}

export const subtitle = createFactory(SubTitle);
